"use client";

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { 
  Heart, 
  Copy, 
  Edit3, 
  Trash2, 
  Eye,
  MoreVertical,
  Clock,
  Code2
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CodeSnippet } from '@/types/snippet';
import { toast } from '@/hooks/use-toast';

interface SnippetListProps {
  snippets: CodeSnippet[];
  onEdit: (snippet: CodeSnippet) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onView: (snippet: CodeSnippet) => void;
}

export const SnippetList = ({
  snippets,
  onEdit,
  onDelete,
  onToggleFavorite,
  onView,
}: SnippetListProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      toast({
        title: "Copied!",
        description: "Code snippet copied to clipboard.",
      });
      setTimeout(() => setCopiedId(null), 2000);
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

  if (snippets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <Code2 className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No snippets found</h3>
        <p className="text-muted-foreground">
          Create your first code snippet to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {snippets.map((snippet) => (
        <Card 
          key={snippet.id} 
          className="group hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onView(snippet)}
        >
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-lg">
                  {getLanguageIcon(snippet.language)}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">
                    {snippet.title}
                  </h3>
                  <p className="text-xs text-muted-foreground capitalize">
                    {snippet.language}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(snippet.id);
                  }}
                >
                  <Heart 
                    className={`h-4 w-4 ${
                      snippet.isFavorite ? 'fill-red-500 text-red-500' : ''
                    }`} 
                  />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onView(snippet)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => copyToClipboard(snippet.code, snippet.id)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {copiedId === snippet.id ? 'Copied!' : 'Copy'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(snippet)}>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => onDelete(snippet.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">
                  {snippet.category}
                </Badge>
                {snippet.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {snippet.description && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {snippet.description}
              </p>
            )}

            <div className="bg-muted rounded-md p-2 mb-3">
              <pre className="text-xs overflow-hidden">
                <code className="line-clamp-3">
                  {snippet.code}
                </code>
              </pre>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>
                  {formatDistanceToNow(new Date(snippet.updatedAt), { 
                    addSuffix: true 
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(snippet.code, snippet.id);
                  }}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};