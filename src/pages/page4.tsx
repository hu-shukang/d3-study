import { useCallback, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { numberUtil } from '@/utils/number.util';

const Page4 = () => {
  const containerRef = useRef<SVGSVGElement>(null!);
  const dataset = [1, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];
  const width = 600;
  const height = 250;
  const padding = 4;

  useEffect(() => {
    const svg = d3.select(containerRef.current);
    svg.attr('width', width).attr('height', height);
    const xScale = d3.scaleLinear<number, number>().domain([0, dataset.length]).range([0, width]);
    const yScale = d3
      .scaleLinear<number, number>()
      .domain([0, d3.max(dataset)!])
      .range([0, height]);

    svg
      .selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', (_, i) => xScale(i))
      .attr('y', d => height - yScale(d))
      .attr('width', width / dataset.length - padding)
      .attr('height', d => yScale(d))
      .attr('fill', 'red');

    return () => {
      containerRef.current.innerHTML = '';
    };
  }, []);

  const updateDataSet = useCallback(() => {
    const newDataSet = Array(20)
      .fill(0)
      .map(() => numberUtil.random(5, 30));
    const yScale = d3
      .scaleLinear<number, number>()
      .domain([0, d3.max(newDataSet)!])
      .range([0, height]);
    const svg = d3.select(containerRef.current);

    svg
      .selectAll('rect')
      .data(newDataSet)
      .transition()
      .duration(1000)
      .ease(d3.easeElasticOut.amplitude(0.1).period(0.3))
      .delay((_d, i) => i * 100)
      .attr('y', d => height - yScale(d))
      .attr('height', d => yScale(d));
  }, []);

  return (
    <>
      <svg ref={containerRef} style={{ padding: '20px' }}></svg>
      <button onClick={updateDataSet}>update</button>
    </>
  );
};

export default Page4;
