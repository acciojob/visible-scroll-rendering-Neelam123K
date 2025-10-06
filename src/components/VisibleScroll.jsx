import React, { useEffect, useState, useRef } from "react";

const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

const VisibleScroll = () => {
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState([]);
  const itemHeight = 50; // So 500px / 50px = 10 items visible

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, clientHeight } = containerRef.current;

        const startIndex = Math.floor(scrollTop / itemHeight);
        const endIndex = Math.min(
          items.length - 1,
          Math.ceil((scrollTop + clientHeight) / itemHeight) - 1 // ✅ fix
        );

        const slicedItems = items
          .slice(startIndex, endIndex + 1)
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
            <h2 style={{ margin: "4px 0" }}>Lorem ipsum dolor sit amet</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisibleScroll;
