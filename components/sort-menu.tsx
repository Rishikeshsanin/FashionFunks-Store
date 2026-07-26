"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CheckIcon, ChevronIcon } from "@/components/icons";
import type { SortOption } from "@/types/catalog";

const options: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "rating", label: "Top rated" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
];

export function SortMenu({ value, onChange }: { value: SortOption; onChange: (value: SortOption) => void }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() => Math.max(0, options.findIndex((option) => option.value === value)));
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    setActiveIndex(Math.max(0, options.findIndex((option) => option.value === value)));
  }, [value]);

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    window.addEventListener("pointerdown", closeOnOutsideClick);
    return () => window.removeEventListener("pointerdown", closeOnOutsideClick);
  }, []);

  function select(index: number) {
    onChange(options[index].value);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      setOpen(false);
      buttonRef.current?.focus();
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((current) => {
        const direction = event.key === "ArrowDown" ? 1 : -1;
        return (current + direction + options.length) % options.length;
      });
    }
    if ((event.key === "Enter" || event.key === " ") && open) {
      event.preventDefault();
      select(activeIndex);
    }
    if (event.key === "Home" && open) {
      event.preventDefault();
      setActiveIndex(0);
    }
    if (event.key === "End" && open) {
      event.preventDefault();
      setActiveIndex(options.length - 1);
    }
  }

  return (
    <div className={`sort-menu${open ? " sort-menu--open" : ""}`} ref={rootRef} onKeyDown={onKeyDown}>
      <span className="sort-menu__label">Sort by</span>
      <button
        ref={buttonRef}
        className="sort-menu__trigger"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{selected.label}</span><ChevronIcon />
      </button>
      <div className="sort-menu__popover">
        <div id={listId} className="sort-menu__list" role="listbox" aria-label="Sort products">
          {options.map((option, index) => (
            <button
              type="button"
              role="option"
              aria-selected={option.value === value}
              className={activeIndex === index ? "active" : ""}
              key={option.value}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => select(index)}
            >
              <span>{option.label}</span>{option.value === value && <CheckIcon />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
