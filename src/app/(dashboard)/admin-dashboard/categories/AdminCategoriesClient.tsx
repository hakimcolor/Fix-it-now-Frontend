'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { PlusCircle, Tag } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

import {
  Category,
  createCategory,
  toggleCategoryStatus,
} from '../../_actions/adminCategories';

interface Props {
  categories: Category[];
}

export default function AdminCategoriesClient({ categories }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleCreate = () => {
    if (!name.trim()) {
      toast.error('Category name is required');
      return;
    }

    startTransition(async () => {
      const result = await createCategory({ name: name.trim(), description });
      if (result.success) {
        toast.success(result.message);
        setName('');
        setDescription('');
        setOpen(false);
      } else {
        toast.error(result.message);
      }
    });
  };

  const handleToggle = (id: string, current: boolean) => {
    startTransition(async () => {
      const result = await toggleCategoryStatus(id, !current);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Create button */}
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Category
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Category</DialogTitle>
              <DialogDescription>
                Add a new service category to the platform.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="cat-name">Name</Label>
                <Input
                  id="cat-name"
                  placeholder="e.g. Plumbing"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cat-desc">Description</Label>
                <Textarea
                  id="cat-desc"
                  placeholder="Brief description of the category..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <Button
                className="w-full"
                onClick={handleCreate}
                disabled={isPending}
              >
                {isPending ? 'Creating...' : 'Create Category'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories grid */}
      {categories.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
            <Tag className="h-10 w-10" />
            <p>No categories yet. Create one above.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((cat) => (
            <Card key={cat.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{cat.name}</CardTitle>
                  <Badge variant={cat.isActive ? 'default' : 'secondary'}>
                    {cat.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                {cat.description && (
                  <CardDescription className="line-clamp-2">
                    {cat.description}
                  </CardDescription>
                )}
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {new Date(cat.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-xs">
                      {cat.isActive ? 'Disable' : 'Enable'}
                    </span>
                    <Switch
                      checked={cat.isActive}
                      disabled={isPending}
                      onCheckedChange={() => handleToggle(cat.id, cat.isActive)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
