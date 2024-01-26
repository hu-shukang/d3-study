import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Page2 = () => {
  const containerRef = useRef<SVGSVGElement>(null!);

  useEffect(() => {
    const dataset = [
      [5, 20],
      [480, 90],
      [250, 50],
      [100, 30],
      [330, 95],
      [410, 12],
      [475, 44],
      [25, 67],
      [85, 21],
      [220, 88],
    ];
    const width = 300;
    const height = 200;
    const padding = 20;
    const xMax = d3.max(dataset, d => d[0]) ?? 0;
    const yMax = d3.max(dataset, d => d[1]) ?? 0;
    const xScale = d3
      .scaleLinear()
      .domain([0, xMax])
      .range([padding, width - padding]);
    const yScale = d3
      .scaleLinear()
      .domain([0, yMax])
      .range([padding, height - padding]);
    const rScale = d3.scaleLinear().domain([0, yMax]).range([5, 10]);

    d3.select(containerRef.current)
      .attr('width', width)
      .attr('height', height)
      .selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d[0]))
      .attr('cy', d => yScale(d[1]))
      .attr('fill', 'red')
      .attr('r', d => rScale(d[1]));

    return () => {
      containerRef.current.innerHTML = '';
    };
  }, []);

  return <svg ref={containerRef} style={{ padding: '20px' }}></svg>;
};

export default Page2;
