'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { PlusCircle, Tag, Pencil, Trash2, MoreHorizontal } from 'lucide-react';

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
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Category,
  createCategory,
  toggleCategoryStatus,
} from '../../_actions/adminCategories';
import {
  updateCategory,
  deleteCategory,
} from '../../_actions/updateAdminCategory';

interface Props {
  categories: Category[];
}

export default function AdminCategoriesClient({ categories: initial }: Props) {
  const router = useRouter();
  const [cats, setCats] = useState<Category[]>(initial);
  const [isPending, startTransition] = useTransition();

  // Create dialog
  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Edit dialog
  const [editOpen, setEditOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Category | null>(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');

  // Delete dialog
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  const openEdit = (cat: Category) => {
    setEditTarget(cat);
    setEditName(cat.name);
    setEditDesc(cat.description ?? '');
    setEditOpen(true);
  };

  const handleCreate = () => {
    if (!newName.trim()) {
      toast.error('Name is required');
      return;
    }
    startTransition(async () => {
      const res = await createCategory({
        name: newName.trim(),
        description: newDesc,
      });
      if (res.success) {
        toast.success(res.message);
        setNewName('');
        setNewDesc('');
        setCreateOpen(false);
        router.refresh();
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleEdit = () => {
    if (!editTarget || !editName.trim()) {
      toast.error('Name is required');
      return;
    }
    startTransition(async () => {
      const res = await updateCategory(editTarget.id, {
        name: editName.trim(),
        description: editDesc,
      });
      if (res.success) {
        toast.success(res.message);
        setCats((prev) =>
          prev.map((c) =>
            c.id === editTarget.id
              ? { ...c, name: editName.trim(), description: editDesc }
              : c
          )
        );
        setEditOpen(false);
        router.refresh();
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    startTransition(async () => {
      const res = await deleteCategory(deleteTarget.id);
      if (res.success) {
        toast.success(res.message);
        setCats((prev) => prev.filter((c) => c.id !== deleteTarget.id));
        router.refresh();
      } else {
        toast.error(res.message);
      }
      setDeleteTarget(null);
    });
  };

  const handleToggle = (id: string, current: boolean) => {
    startTransition(async () => {
      const res = await toggleCategoryStatus(id, !current);
      if (res.success) {
        toast.success(res.message);
        setCats((prev) =>
          prev.map((c) => (c.id === id ? { ...c, isActive: !current } : c))
        );
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header toolbar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {cats.length} categories total
        </p>
        <Button onClick={() => setCreateOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Category
        </Button>
      </div>

      {/* Grid */}
      {cats.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
            <Tag className="h-10 w-10 opacity-30" />
            <p>No categories yet. Create one above.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cats.map((cat) => (
            <Card
              key={cat.id}
              className="group relative overflow-hidden transition-shadow hover:shadow-md"
            >
              {/* Active indicator strip */}
              <div
                className={`absolute left-0 top-0 h-full w-1 rounded-l-lg ${cat.isActive ? 'bg-emerald-500' : 'bg-muted'}`}
              />

              <CardHeader className="pb-3 pl-5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <CardTitle className="truncate text-base">
                      {cat.name}
                    </CardTitle>
                    {cat.slug && (
                      <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                        /{cat.slug}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <Badge
                      variant="outline"
                      className={
                        cat.isActive
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-gray-200 bg-gray-50 text-gray-500'
                      }
                    >
                      {cat.isActive ? 'Active' : 'Inactive'}
                    </Badge>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 opacity-0 group-hover:opacity-100"
                          disabled={isPending}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEdit(cat)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeleteTarget(cat)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {cat.description && (
                  <CardDescription className="line-clamp-2 text-xs">
                    {cat.description}
                  </CardDescription>
                )}
              </CardHeader>

              <CardContent className="pl-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-xs text-muted-foreground">
                    {new Date(cat.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
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

      {/* Create dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
            <DialogDescription>
              Add a new service category to the platform.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="new-name">Name</Label>
              <Input
                id="new-name"
                placeholder="e.g. Plumbing"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-desc">Description</Label>
              <Textarea
                id="new-desc"
                placeholder="Brief description…"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                rows={3}
              />
            </div>
            <Button
              className="w-full"
              onClick={handleCreate}
              disabled={isPending}
            >
              {isPending ? 'Creating…' : 'Create Category'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category name or description.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-desc">Description</Label>
              <Textarea
                id="edit-desc"
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                rows={3}
              />
            </div>
            <Button
              className="w-full"
              onClick={handleEdit}
              disabled={isPending}
            >
              {isPending ? 'Saving…' : 'Save Changes'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete &ldquo;{deleteTarget?.name}&rdquo;?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the category from the platform. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
              disabled={isPending}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
