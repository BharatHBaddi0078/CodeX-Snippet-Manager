"use client";

import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { SnippetList } from '@/components/SnippetList';
import { SnippetEditor } from '@/components/SnippetEditor';
import { SnippetViewer } from '@/components/SnippetViewer';
import { SnippetSidebar } from '@/components/SnippetSidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useSnippets } from '@/hooks/useSnippets';
import { CodeSnippet } from '@/types/snippet';
import { toast } from '@/hooks/use-toast';

export default function CodeSnippetManager() {
  const {
    snippets,
    categories,
    addSnippet,
    updateSnippet,
    deleteSnippet,
    toggleFavorite,
  } = useSnippets();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [editingSnippet, setEditingSnippet] = useState<CodeSnippet | null>(null);
  const [viewingSnippet, setViewingSnippet] = useState<CodeSnippet | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Filter snippets based on search, category, and language
  const filteredSnippets = useMemo(() => {
    return snippets.filter((snippet) => {
      const matchesSearch = !searchQuery || 
        snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = !selectedCategory || snippet.category === selectedCategory;
      const matchesLanguage = !selectedLanguage || snippet.language === selectedLanguage;

      return matchesSearch && matchesCategory && matchesLanguage;
    });
  }, [snippets, searchQuery, selectedCategory, selectedLanguage]);

  const favoriteCount = snippets.filter(s => s.isFavorite).length;

  const handleNewSnippet = () => {
    setEditingSnippet(null);
    setIsEditorOpen(true);
  };

  const handleEditSnippet = (snippet: CodeSnippet) => {
    setEditingSnippet(snippet);
    setIsEditorOpen(true);
    setIsViewerOpen(false);
  };

  const handleViewSnippet = (snippet: CodeSnippet) => {
    setViewingSnippet(snippet);
    setIsViewerOpen(true);
  };

  const handleSaveSnippet = (snippetData: Omit<CodeSnippet, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingSnippet) {
      updateSnippet(editingSnippet.id, snippetData);
      toast({
        title: "Snippet updated!",
        description: "Your code snippet has been successfully updated.",
      });
    } else {
      addSnippet(snippetData);
      toast({
        title: "Snippet created!",
        description: "Your new code snippet has been saved.",
      });
    }
    setIsEditorOpen(false);
    setEditingSnippet(null);
  };

  const handleDeleteSnippet = (id: string) => {
    deleteSnippet(id);
    toast({
      title: "Snippet deleted",
      description: "The code snippet has been removed.",
    });
  };

  const handleCancelEdit = () => {
    setIsEditorOpen(false);
    setEditingSnippet(null);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setViewingSnippet(null);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <SnippetSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          selectedLanguage={selectedLanguage}
          onLanguageSelect={setSelectedLanguage}
          onNewSnippet={handleNewSnippet}
          totalSnippets={snippets.length}
          favoriteCount={favoriteCount}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4 flex-1">
                <h1 className="text-2xl font-bold">Code Snippets</h1>
                <div className="flex-1 max-w-md">
                  <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search snippets..."
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button onClick={handleNewSnippet}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Snippet
                </Button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto p-6">
            {/* Stats */}
            <div className="mb-6">
              <div className="text-sm text-muted-foreground">
                Showing {filteredSnippets.length} of {snippets.length} snippets
                {selectedCategory && (
                  <span> • Category: {selectedCategory}</span>
                )}
                {selectedLanguage && (
                  <span> • Language: {selectedLanguage}</span>
                )}
                {searchQuery && (
                  <span> • Search: &ldquo;{searchQuery}&rdquo;</span>
                )}
              </div>
            </div>

            {/* Snippets Grid */}
            <SnippetList
              snippets={filteredSnippets}
              onEdit={handleEditSnippet}
              onDelete={handleDeleteSnippet}
              onToggleFavorite={toggleFavorite}
              onView={handleViewSnippet}
            />
          </div>
        </div>

        {/* Editor Modal */}
        <SnippetEditor
          snippet={editingSnippet || undefined}
          onSave={handleSaveSnippet}
          onCancel={handleCancelEdit}
          isOpen={isEditorOpen}
        />

        {/* Viewer Modal */}
        <SnippetViewer
          snippet={viewingSnippet}
          onClose={handleCloseViewer}
          onEdit={handleEditSnippet}
          onToggleFavorite={toggleFavorite}
          isOpen={isViewerOpen}
        />
      </div>
    </SidebarProvider>
  );
}