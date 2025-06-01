import React, { createContext, useState, useEffect } from 'react';
import { snippetsData } from '../data/snippets';

export const SnippetContext = createContext();

export const SnippetProvider = ({ children }) => {
  const [snippets, setSnippets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredSnippets, setFilteredSnippets] = useState([]);

  // Initialize data
  useEffect(() => {
    setSnippets(snippetsData);
    
    // Extract unique categories
    const uniqueCategories = [...new Set(snippetsData.map(snippet => snippet.category))];
    setCategories(uniqueCategories.map(category => ({
      id: category,
      name: category.charAt(0).toUpperCase() + category.slice(1)
    })));
    
    // Extract unique tags
    const allTags = snippetsData.flatMap(snippet => snippet.tags);
    setTags([...new Set(allTags)]);
  }, []);

  // Filter snippets when search or filters change
  useEffect(() => {
    let filtered = [...snippets];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(snippet => 
        snippet.title.toLowerCase().includes(query) || 
        snippet.description.toLowerCase().includes(query) ||
        snippet.code.toLowerCase().includes(query) ||
        snippet.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(snippet => snippet.category === selectedCategory);
    }
    
    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(snippet => 
        selectedTags.every(tag => snippet.tags.includes(tag))
      );
    }
    
    setFilteredSnippets(filtered);
  }, [snippets, searchQuery, selectedCategory, selectedTags]);

  // Toggle tag selection
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <SnippetContext.Provider value={{
      snippets,
      categories,
      tags,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      selectedTags,
      setSelectedTags,
      toggleTag,
      filteredSnippets
    }}>
      {children}
    </SnippetContext.Provider>
  );
};