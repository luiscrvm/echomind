// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Import modules
mod audio;
mod transcription;
mod llm;
mod storage;

// Tauri commands
#[tauri::command]
async fn start_recording(app_handle: tauri::AppHandle) -> Result<(), String> {
    audio::start_recording()
}

#[tauri::command]
async fn stop_recording(app_handle: tauri::AppHandle) -> Result<String, String> {
    audio::stop_recording()
}

#[tauri::command]
async fn transcribe_audio(audio_path: String) -> Result<String, String> {
    transcription::transcribe_audio(&audio_path).await
}

#[tauri::command]
async fn summarize_text(text: String) -> Result<String, String> {
    llm::summarize_text(&text).await
}

#[tauri::command]
async fn generate_key_points(text: String) -> Result<Vec<String>, String> {
    llm::generate_key_points(&text).await
}

#[tauri::command]
async fn save_summary(title: String, content: String) -> Result<String, String> {
    storage::save_summary(&title, &content)
}

#[tauri::command]
async fn get_summary(id: String) -> Result<storage::Summary, String> {
    storage::get_summary(&id)
}

#[tauri::command]
async fn list_summaries() -> Result<Vec<storage::Summary>, String> {
    storage::list_summaries()
}

fn main() {
    // Initialize modules
    audio::initialize();
    
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            start_recording,
            stop_recording,
            transcribe_audio,
            summarize_text,
            generate_key_points,
            save_summary,
            get_summary,
            list_summaries
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
