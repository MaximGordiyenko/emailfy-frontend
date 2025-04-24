import React, { useRef, useEffect, useState } from 'react';

/**
 * A React component that applies a horizontal translateX transform
 * to its child element based on the parent container's scroll position relative to the viewport.
 *
 * The effect mimics the original letterCarousel function's logic.
 * The child element passed as `children` will be the one receiving the transform.
 * The parent container element that triggers the effect is the outer div rendered by this component.
 */
function ScrollCarouselEffect({ children }) {
  // Ref for the parent container element (the one that determines when effect starts)
  const parentRef = useRef(null);
  // Ref for the child element that will have the transform applied
  // We assume the effect applies to the direct child passed via `children`
  // If the effect needs to apply to a specific descendant, you might need
  // a different approach, perhaps passing a ref down or using a selector (less ideal).
  const childRef = useRef(null);
  
  // State to hold the calculated translateX value
  const [translateX, setTranslateX] = useState(0);
  
  useEffect(() => {
    // Get the actual DOM nodes from the refs
    const parentElement = parentRef.current;
    const childElement = childRef.current;
    
    // If refs are not yet assigned (e.g., component not mounted), do nothing
    if (!parentElement || !childElement) {
      return;
    }
    
    // Function to handle the scroll event
    const handleScroll = () => {
      // Get current scroll position and window height
      const documentScrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const viewportBottom = documentScrollTop + windowHeight;
      
      // Get the position of the parent element relative to the viewport
      const parentRect = parentElement.getBoundingClientRect();
      // Calculate the top of the parent element relative to the document
      const parentOffsetTop = parentRect.top + documentScrollTop;
      
      // Check if the parent element's top is within or above the viewport bottom
      if (parentOffsetTop <= viewportBottom) {
        // Calculate scroll amount relative to when the parent's top entered the viewport
        let scrollAmountRelativeToParentTop = documentScrollTop - parentOffsetTop + windowHeight;
        
        // Apply the specific calculations from the original function
        let scroll = scrollAmountRelativeToParentTop - 10; // Original offset
        let scroll_slow = scroll + ((scroll / 70) / 100); // Original calculation
        let img_scroll = scroll_slow * 30 / 100; // Original calculation (renamed for clarity)
        
        // Update the state with the new transform value
        // React will re-render the component and apply the style
        setTranslateX(img_scroll);
      } else {
        // Optional: Reset the position if the parent is out of view
        // This prevents the element from being stuck translated far away
        // when the parent is no longer visible.
        setTranslateX(0);
      }
    };
    
    // Add the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);
    
    // Call handleScroll once on mount to set the initial position
    // if the element is already in the viewport on page load.
    handleScroll();
    
    // Cleanup function: Remove the event listener when the component unmounts
    // This prevents memory leaks.
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [children]); // Dependency array: Re-run effect if children change (unlikely here)
  
  // Render the component structure
  // The outer div is the "parent" that determines the scroll trigger
  // The inner div wraps the children and gets the transform style
  return (
    <div ref={parentRef}>
      <div
        ref={childRef}
        style={{
          transform: `translateX(${translateX}px)`,
          // Optional: Add a transition for a smoother effect
          // transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Render the content passed to this component */}
        {children}
      </div>
    </div>
  );
}

export default ScrollCarouselEffect;
