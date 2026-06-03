import { useRef, useState, useCallback } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { ImagePlus, X, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

export default function ImageUpload({ images, onImagesChange, maxImages = 5 }: ImageUploadProps) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const newImages: string[] = [...images];
      Array.from(files)
        .slice(0, maxImages - images.length)
        .forEach((file) => {
          if (file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024) {
            const url = URL.createObjectURL(file);
            newImages.push(url);
          }
        });
      onImagesChange(newImages);
    },
    [images, maxImages, onImagesChange]
  );

  const removeImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    onImagesChange(updated);
  };

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${
          dragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm font-medium text-muted-foreground">{t('dragDropImages')}</p>
        <p className="text-xs text-muted-foreground mt-1">{t('addImages')}</p>
      </div>

      {/* Preview grid */}
      <AnimatePresence>
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {images.map((img, i) => (
              <motion.div
                key={img}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-destructive/80 text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
