import { useCallback, useMemo } from "react";

// Debounce hook for search
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Memoized task filtering
export const useFilteredTasks = (tasks, filters) => {
  return useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        !filters.searchTerm ||
        task.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        task.id.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const matchesSeverity =
        !filters.selectedSeverity || task.severity === filters.selectedSeverity;
      const matchesSource =
        !filters.selectedSource || task.source === filters.selectedSource;

      return matchesSearch && matchesSeverity && matchesSource;
    });
  }, [tasks, filters]);
};

// Virtualization for large lists
export const useVirtualization = (items, containerHeight, itemHeight) => {
  const [scrollTop, setScrollTop] = React.useState(0);

  const visibleRange = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(
      start + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );
    return { start, end };
  }, [scrollTop, itemHeight, containerHeight, items.length]);

  const visibleItems = useMemo(() => {
    return items
      .slice(visibleRange.start, visibleRange.end)
      .map((item, index) => ({
        ...item,
        index: visibleRange.start + index,
      }));
  }, [items, visibleRange]);

  return {
    visibleItems,
    totalHeight: items.length * itemHeight,
    offsetY: visibleRange.start * itemHeight,
    onScroll: useCallback((e) => {
      setScrollTop(e.target.scrollTop);
    }, []),
  };
};
