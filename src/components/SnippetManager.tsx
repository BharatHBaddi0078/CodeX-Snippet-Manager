import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';
import Input from './Input';

interface Snippet {
  id: string;
  title: string;
  code: string;
}

interface Category {
  id: string;
  name: string;
  snippets: Snippet[];
}

const initialCategories: Category[] = [
  { id: 'dsa', name: 'DSA', snippets: [] },
  { id: 'ui', name: 'UI', snippets: [] },
];

const SnippetManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('dsa');
  const [newSnippet, setNewSnippet] = useState({ title: '', code: '' });

  const addCategory = () => {
    if (!newCategory.trim()) return;
    setCategories([...categories, { id: newCategory.toLowerCase(), name: newCategory, snippets: [] }]);
    setNewCategory('');
  };

  const removeCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
    if (selectedCategory === id && categories.length > 1) {
      setSelectedCategory(categories[0].id);
    }
  };

  const addSnippet = () => {
    if (!newSnippet.title.trim() || !newSnippet.code.trim()) return;
    setCategories(categories.map(cat =>
      cat.id === selectedCategory
        ? { ...cat, snippets: [...cat.snippets, { ...newSnippet, id: Date.now().toString() }] }
        : cat
    ));
    setNewSnippet({ title: '', code: '' });
  };

  const removeSnippet = (snippetId: string) => {
    setCategories(categories.map(cat =>
      cat.id === selectedCategory
        ? { ...cat, snippets: cat.snippets.filter(s => s.id !== snippetId) }
        : cat
    ));
  };

  const currentCategory = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Category List */}
      <div className="w-full md:w-1/4">
        <Card>
          <h2 className="font-semibold mb-2">Categories</h2>
          <ul>
            {categories.map(cat => (
              <li key={cat.id} className="flex items-center justify-between mb-1">
                <button
                  className={`text-left w-full ${selectedCategory === cat.id ? 'font-bold text-blue-600' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.name}
                </button>
                <Button variant="secondary" onClick={() => removeCategory(cat.id)}>-</Button>
              </li>
            ))}
          </ul>
          <div className="flex mt-2 gap-2">
            <Input
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              placeholder="New category"
            />
            <Button onClick={addCategory}>+</Button>
          </div>
        </Card>
      </div>
      {/* Snippet List */}
      <div className="w-full md:w-3/4">
        <Card>
          <h2 className="font-semibold mb-2">Snippets ({currentCategory?.name})</h2>
          <ul>
            {currentCategory?.snippets.map(snippet => (
              <li key={snippet.id} className="mb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{snippet.title}</div>
                    <pre className="bg-gray-100 rounded p-2 text-sm overflow-x-auto mt-1"><code>{snippet.code}</code></pre>
                  </div>
                  <Button variant="secondary" onClick={() => removeSnippet(snippet.id)}>-</Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Input
              value={newSnippet.title}
              onChange={e => setNewSnippet({ ...newSnippet, title: e.target.value })}
              placeholder="Snippet title"
            />
            <textarea
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              value={newSnippet.code}
              onChange={e => setNewSnippet({ ...newSnippet, code: e.target.value })}
              placeholder="Code..."
              rows={4}
            />
            <Button onClick={addSnippet}>Add Snippet</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SnippetManager;
