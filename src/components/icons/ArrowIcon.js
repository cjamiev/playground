import React from 'react';

const ArrowIcon = ({ up, right, left, down}) => {
  if(up) {
    return (
      <path aria-label="up arrow" d="m 26.448532,52.616779 c -2.282187,0 -4.119483,-1.837331 -4.119483,-4.119498 V 13.537775 l -9.546334,9.251261 c -1.638853,1.588212 -4.2367555,1.547547 -5.8249761,-0.0913 -1.5882211,-1.638853 -1.5475422,-4.236907 0.09131,-5.825121 L 22.136132,2.2518704 c 0.483372,-0.468421 1.050386,-0.793974 1.650088,-0.979786 0.717101,-0.606591 1.645217,-0.972197 2.662312,-0.972197 1.011762,0 1.935467,0.361635 2.651012,0.962511 0.611144,0.184084 1.189373,0.512695 1.681044,0.989174 L 45.867529,16.872462 c 1.638875,1.588221 1.679688,4.186099 0.09146,5.824967 -1.588203,1.638852 -4.186239,1.67968 -5.825115,0.09146 l -9.566005,-9.270324 v 34.978716 c 0,2.282167 -1.837181,4.119498 -4.119337,4.119498 z" />
    );
  } else if(right) {
    return (
      <path aria-label="right arrow" d="m 0.29988589,26.468133 c 0,2.282187 1.83733101,4.119483 4.11949801,4.119483 H 39.378891 l -9.251262,9.546335 c -1.588212,1.638852 -1.547547,4.236755 0.0913,5.824976 1.638853,1.588221 4.236907,1.547542 5.825121,-0.09131 L 50.664798,30.780533 c 0.468421,-0.483372 0.793974,-1.050386 0.979786,-1.650088 0.606591,-0.717101 0.972197,-1.645217 0.972197,-2.662312 0,-1.011762 -0.361635,-1.935467 -0.962511,-2.651012 -0.184084,-0.611144 -0.512695,-1.189373 -0.989174,-1.681044 L 36.044203,7.0491385 c -1.588221,-1.638875 -4.186099,-1.679688 -5.824967,-0.09146 -1.638852,1.588203 -1.67968,4.1862385 -0.09146,5.8251135 l 9.270325,9.566004 H 4.4193839 c -2.282167,0 -4.11949801,1.837181 -4.11949801,4.119337 z" />
    );
  } else if (left) {
    return (
      <path aria-label="left arrow" d="m 52.616781,26.468133 c 0,2.282187 -1.837331,4.119483 -4.119498,4.119483 H 13.537776 l 9.251262,9.546335 c 1.588212,1.638852 1.547547,4.236755 -0.0913,5.824976 -1.638853,1.588221 -4.236907,1.547542 -5.825121,-0.09131 L 2.2518689,30.780533 C 1.7834479,30.297161 1.4578948,29.730147 1.2720829,29.130445 0.66549189,28.413344 0.29988589,27.485228 0.29988589,26.468133 c 0,-1.011762 0.361635,-1.935467 0.96251101,-2.651012 0.1840839,-0.611144 0.512695,-1.189373 0.989174,-1.681044 L 16.872464,7.0491385 c 1.588221,-1.638875 4.186099,-1.679688 5.824967,-0.09146 1.638852,1.588203 1.67968,4.1862385 0.09146,5.8251135 l -9.270325,9.566004 h 34.978717 c 2.282167,0 4.119498,1.837181 4.119498,4.119337 z" />
    );
  } else {
    return (
      <path aria-label="down arrow" d="m 26.448532,0.2998874 c -2.282187,0 -4.119483,1.837331 -4.119483,4.1194978 V 39.378891 L 12.782715,30.12763 c -1.638853,-1.588212 -4.2367555,-1.547547 -5.8249761,0.0913 -1.5882211,1.638853 -1.5475422,4.236907 0.09131,5.825121 L 22.136132,50.664796 c 0.483372,0.468421 1.050386,0.793974 1.650088,0.979786 0.717101,0.606591 1.645217,0.972197 2.662312,0.972197 1.011762,0 1.935467,-0.361635 2.651012,-0.962511 0.611144,-0.184084 1.189373,-0.512695 1.681044,-0.989174 l 15.086941,-14.62089 c 1.638875,-1.588221 1.679688,-4.186099 0.09146,-5.824967 -1.588203,-1.638852 -4.186239,-1.67968 -5.825115,-0.09146 l -9.566005,9.270324 V 4.4193852 c 0,-2.2821668 -1.837181,-4.1194978 -4.119337,-4.1194978 z" />
    );
  }
};

export default ArrowIcon;