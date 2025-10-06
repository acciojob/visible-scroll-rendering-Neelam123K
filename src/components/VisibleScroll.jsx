import React, { useEffect, useState, useRef } from "react";

const items = Array.from({ length: 100 }, (_, i) => `Item ${i}`); // ✅ zero-based

const VisibleScroll = () => {
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState([]);
  const itemHeight = 50; // 10 items in 500px

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, clientHeight } = containerRef.current;

        const startIndex = Math.floor(scrollTop / itemHeight);

        // ✅ Always render exactly 10 items (or fewer if at end)
        const endIndex = Math.min(startIndex + 10, items.length);

        const slicedItems = items
          .slice(startIndex, endIndex)
          .map((item, i) => ({
            item,
            index: startIndex + i,
          }));

        setVisibleItems(slicedItems);
      }
    };

    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial render

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: "500px", overflow: "auto" }}
    >
      <div
        style={{
          height: `${items.length * itemHeight}px`,
          position: "relative",
        }}
      >
        {visibleItems.map(({ item, index }) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: `${index * itemHeight}px`,
              height: `${itemHeight}px`,
              width: "100%",
              boxSizing: "border-box",
              borderBottom: "1px solid #ccc",
              padding: "8px",
            }}
          >
            <strong>{item}</strong>
            <h2 style={{ margin: "4px 0" }}>{lorem}</h2> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisibleScroll;