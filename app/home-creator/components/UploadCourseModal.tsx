'use client';

import React, { useState } from 'react';
import { X, Upload, Image, DollarSign, Type } from 'lucide-react';

interface UploadCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; imageUrl: string; price: string }) => void;
}

export default function UploadCourseModal({ isOpen, onClose, onSubmit }: UploadCourseModalProps) {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, imageUrl, price });
    // Reset form
    setTitle('');
    setImageUrl('');
    setPrice('');
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl shadow-[#10B981]/20 border border-[#D1FAE5] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#F0FDF4] to-[#D1FAE5] border-b border-[#D1FAE5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#10B981] flex items-center justify-center shadow-lg shadow-[#10B981]/30">
              <Upload size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-[#064E3B]">Upload New Course</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#64748B] hover:bg-[#D1FAE5] hover:text-[#064E3B] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-[#064E3B]">
              <Type size={16} className="text-[#10B981]" />
              Course Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter course title"
              required
              className="w-full px-4 py-3 rounded-xl border border-[#D1FAE5] bg-[#F0FDF4]/50 text-[#064E3B] placeholder-[#64748B]/60 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981] transition-all"
            />
          </div>

          {/* Image URL Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-[#064E3B]">
              <Image size={16} className="text-[#10B981]" />
              Image Address (URL)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              required
              className="w-full px-4 py-3 rounded-xl border border-[#D1FAE5] bg-[#F0FDF4]/50 text-[#064E3B] placeholder-[#64748B]/60 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981] transition-all"
            />
          </div>

          {/* Price Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-[#064E3B]">
              <DollarSign size={16} className="text-[#10B981]" />
              Price
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#10B981] font-medium">$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="99.99"
                required
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-[#D1FAE5] bg-[#F0FDF4]/50 text-[#064E3B] placeholder-[#64748B]/60 focus:outline-none focus:ring-2 focus:ring-[#10B981]/50 focus:border-[#10B981] transition-all"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-[#D1FAE5] text-[#64748B] font-medium hover:bg-[#F0FDF4] hover:text-[#064E3B] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-xl bg-[#10B981] text-white font-medium hover:bg-[#059669] transition-all shadow-lg shadow-[#10B981]/25 hover:shadow-[#10B981]/40"
            >
              Upload Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
