import React, { useEffect, useState, useRef } from "react";

const items = Array.from({ length: 1000 }, (_, i) => `Item ${i}`);

const VisibleScroll = () => {
  const containerRef = useRef(null);  // ✅ ref to the scroll container
  const [visibleItems, setVisibleItems] = useState([]);
  const itemHeight = 50;              // fixed row height
  const containerHeight = 500;        // fixed container height

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, clientHeight } = containerRef.current;

        // ✅ compute which items should be visible
        const startIndex = Math.floor(scrollTop / itemHeight);
        const endIndex = Math.min(
          items.length,
          startIndex + Math.ceil(clientHeight / itemHeight)
        );

        const slicedItems = items.slice(startIndex, endIndex).map((item, i) => ({
          item,
          index: startIndex + i,
        }));

        setVisibleItems(slicedItems);
      }
    };

    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);

    handleScroll(); // run once to set initial items

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: `${containerHeight}px`,
        overflowY: "auto",         // ✅ scrollbars only when needed
        border: "1px solid #ccc",
      }}
    >
      <div
        style={{
          height: `${items.length * itemHeight}px`, // ✅ full height spacer
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
              borderBottom: "1px solid #eee",
              padding: "8px",
            }}
          >
            <strong>{item}</strong>
            <p style={{ margin: "4px 0" }}>Lorem ipsum dolor sit amet.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisibleScroll;