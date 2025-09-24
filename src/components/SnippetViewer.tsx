"use client";

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { 
  X, 
  Copy, 
  Edit3, 
  Heart, 
  Clock, 
  Hash,
  Code2,
  Eye,
  EyeOff
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CodeSnippet } from '@/types/snippet';
import { toast } from '@/hooks/use-toast';
import dynamic from 'next/dynamic';

// Dynamically import Monaco Editor to avoid SSR issues
const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96 bg-muted rounded-md">
      <div className="text-center">
        <Code2 className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Loading code...</p>
      </div>
    </div>
  ),
});

interface SnippetViewerProps {
  snippet: CodeSnippet | null;
  onClose: () => void;
  onEdit: (snippet: CodeSnippet) => void;
  onToggleFavorite: (id: string) => void;
  isOpen: boolean;
}

export const SnippetViewer = ({
  snippet,
  onClose,
  onEdit,
  onToggleFavorite,
  isOpen,
}: SnippetViewerProps) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [isCodeVisible, setIsCodeVisible] = useState(true);

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      toast({
        title: "Copied!",
        description: "Code snippet copied to clipboard.",
      });
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy code snippet.",
        variant: "destructive",
      });
    }
  };

  const getLanguageIcon = (language: string) => {
    const icons: Record<string, string> = {
      javascript: '🟨',
      typescript: '🔷',
      python: '🐍',
      css: '🎨',
      html: '🌐',
      json: '📄',
      bash: '⚡',
      sql: '🗄️',
    };
    return icons[language] || '📝';
  };

  if (!isOpen || !snippet) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              {getLanguageIcon(snippet.language)}
            </span>
            <div>
              <CardTitle className="text-xl">{snippet.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1 capitalize">
                {snippet.language} • {snippet.category}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggleFavorite(snippet.id)}
            >
              <Heart 
                className={`h-4 w-4 ${
                  snippet.isFavorite ? 'fill-red-500 text-red-500' : ''
                }`} 
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCodeVisible(!isCodeVisible)}
            >
              {isCodeVisible ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(snippet)}
            >
              <Edit3 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
          {/* Description */}
          {snippet.description && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Hash className="h-4 w-4" />
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {snippet.description}
              </p>
            </div>
          )}

          {/* Tags */}
          {snippet.tags.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {snippet.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Code Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Code2 className="h-4 w-4" />
                Code
              </h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(snippet.code)}
                  disabled={copiedCode}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {copiedCode ? 'Copied!' : 'Copy Code'}
                </Button>
              </div>
            </div>

            {isCodeVisible && (
              <div className="border rounded-lg overflow-hidden">
                <Editor
                  height="400px"
                  language={snippet.language}
                  value={snippet.code}
                  theme="vs-dark"
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    wordWrap: 'on',
                    contextmenu: false,
                    copyWithSyntaxHighlighting: true,
                  }}
                />
              </div>
            )}

            {!isCodeVisible && (
              <div className="border rounded-lg p-8 text-center bg-muted/50">
                <EyeOff className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Code is hidden. Click the eye icon to show it.
                </p>
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>
                  Created {formatDistanceToNow(new Date(snippet.createdAt), { 
                    addSuffix: true 
                  })}
                </span>
              </div>
              {snippet.updatedAt !== snippet.createdAt && (
                <div className="flex items-center gap-1">
                  <span>•</span>
                  <span>
                    Updated {formatDistanceToNow(new Date(snippet.updatedAt), { 
                      addSuffix: true 
                    })}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(snippet)}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Snippet
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};