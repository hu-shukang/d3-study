import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Page1 = () => {
  const containerRef = useRef<SVGSVGElement>(null!);
  const data = [5, 10, 15, 20, 25];

  useEffect(() => {
    const width = 20;
    const height = 100;
    const offset = 2;
    d3.select(containerRef.current)
      .attr('width', 500)
      .attr('height', height)
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (_, i) => (width + offset) * i)
      .attr('y', d => height - d)
      .attr('width', width)
      .attr('height', d => d)
      .attr('fill', d => `rgb(0, 0, ${d * 10})`);

    d3.select(containerRef.current)
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .text(d => d)
      .attr('x', (_, i) => i * (width + offset) + width / 2)
      .attr('text-anchor', 'middle')
      .attr('y', d => height - d - offset)
      .attr('fill', 'red');

    return () => {
      containerRef.current.innerHTML = '';
    };
  }, []);

  return <svg ref={containerRef} style={{ padding: '20px' }}></svg>;
};

export default Page1;
