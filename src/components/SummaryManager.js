// Summary Manager component
// Handles the UI for displaying and managing summaries

import { invoke } from '@tauri-apps/api/tauri';

export default function SummaryManager() {
  const summarizeText = async (text) => {
    try {
      const summary = await invoke('summarize_text', { text });
      console.log('Summary generated:', summary);
      return summary;
    } catch (error) {
      console.error('Failed to generate summary:', error);
      return null;
    }
  };

  const generateKeyPoints = async (text) => {
    try {
      const keyPoints = await invoke('generate_key_points', { text });
      console.log('Key points generated:', keyPoints);
      return keyPoints;
    } catch (error) {
      console.error('Failed to generate key points:', error);
      return null;
    }
  };

  const saveSummary = async (title, content) => {
    try {
      const summaryId = await invoke('save_summary', { title, content });
      console.log('Summary saved with ID:', summaryId);
      return summaryId;
    } catch (error) {
      console.error('Failed to save summary:', error);
      return null;
    }
  };

  const getSummary = async (id) => {
    try {
      const summary = await invoke('get_summary', { id });
      console.log('Retrieved summary:', summary);
      return summary;
    } catch (error) {
      console.error('Failed to get summary:', error);
      return null;
    }
  };

  const listSummaries = async () => {
    try {
      const summaries = await invoke('list_summaries');
      console.log('Retrieved summaries:', summaries);
      return summaries;
    } catch (error) {
      console.error('Failed to list summaries:', error);
      return null;
    }
  };

  return {
    summarizeText,
    generateKeyPoints,
    saveSummary,
    getSummary,
    listSummaries
  };
}
