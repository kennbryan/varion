import React, { useEffect, useState } from 'react';
import { Box, Typography, Grow, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '@mui/material/styles';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const RoadmapContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  padding: '80px 20px',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
}));

const Milestone = styled(Box)(({ theme, position }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  marginBottom: '40px',
  zIndex: 2,
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  [theme.breakpoints.up('md')]: {
    width: '30%',
    position: 'absolute',
    left: position === 'left' ? '0%' : position === 'center' ? '35%' : '70%',
    marginBottom: 0,
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));

const TextBox = styled(Box)(({ theme, maxHeight }) => ({
  width: '85%',
  padding: '20px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  marginTop: '20px',
  [theme.breakpoints.up('md')]: {
    marginTop: '30px',
  },
}));

const Circle = styled(Box)(({ color, theme }) => ({
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  backgroundColor: color,
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
  },
  [theme.breakpoints.up('md')]: {
    position: 'absolute',
    top: '-15px',
  },
}));

const roadmapData = [
  { 
    quarter: "Q3 2024", 
    color: '#0047AB', 
    heading: [
      'Implementing [Internet Identity].',
      'Implementing [On-chain Deep Learning Model Inference/DeAI].',
      'Providing [Data Insights] and [Graphical Reports].',
      'Releasing to [Mainnet] (Minimum-Viable-Product).'
    ],
    position: 'left'
  },
  { 
    quarter: "Q4-Q1 2025", 
    color: '#4169E1', 
    heading: [
      '[Pre-seed] Funding.',
      'Implementing [Proxy Bridge] to connect [Varion Web3] to [Web2 technologies].',
      'Conducting [Open Beta] to test unreleased features on [Testnet/Playground] (Iterative Development).'
    ],
    position: 'center'
  },
  { 
    quarter: "Q2-Q3 2025", 
    color: '#6495ED', 
    heading: [
      'Implementing [Fully On-chain Training] & [Model Inference/Pure DeAI].',
      '[Direct Data Transmission] from Hospital’s [ECG] data to Varion.',
      'Joining on-site blockchain events to [promote Varion] & [ICP Capabilities].',
      'Releasing to [Mainnet] (Market-Fit).'
    ],
    position: 'right'
  },
];

const MilestoneWithAnimation = ({ milestone, index, maxHeight }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div ref={ref}>
      <Grow
        in={inView}
        style={{ transformOrigin: '0 0 0' }}
        {...{ timeout: 1000 + index * 500 }}
      >
        <Milestone position={milestone.position}>
          <Typography
            variant="h6"
            gutterBottom
            style={{
              fontWeight: 'bold',
              color: milestone.color,
              textAlign: 'center',
              marginBottom: '0px',
              marginTop: '20px',
            }}
          >
            {milestone.quarter}
          </Typography>
          <Circle color={milestone.color} />
          <TextBox minHeight={maxHeight}>
            {milestone.heading.map((item, i) => (
              <Box key={i} display="flex" alignItems="flex-start" marginBottom={isMobile ? '10px' : '15px'}>
                <FiberManualRecordIcon 
                  fontSize="small" 
                  style={{ 
                    color: milestone.color, 
                    marginRight: '10px',
                  }} 
                />
                <Typography
                  variant="body2"
                  style={{
                    fontWeight: 'medium',
                  }}
                >
                  {item.split('[').map((part, j) =>
                    j === 0 ? part : (
                      <React.Fragment key={j}>
                        <strong>{part.split(']')[0]}</strong>
                        {part.split(']')[1]}
                      </React.Fragment>
                    )
                  )}
                </Typography>
              </Box>
            ))}
          </TextBox>
        </Milestone>
      </Grow>
    </div>
  );
};

const AnimatedTimelineLine = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div ref={ref} style={{ 
      position: 'absolute', 
      top: isMobile ? '0' : '50%', 
      left: isMobile ? '20px' : '15%', 
      right: isMobile ? 'auto' : '15%',
      bottom: isMobile ? '0' : 'auto',
      width: isMobile ? '4px' : 'auto',
      height: isMobile ? '100%' : '4px',
      transform: isMobile ? 'none' : 'translateY(-50%)',
    }}>
      <Grow
        in={inView}
        style={{ transformOrigin: isMobile ? '50% 0 0' : '0 50% 0' }}
        {...{ timeout: 1000 }}
      >
        <Box
          sx={{
            height: '100%',
            width: '100%',
            background: isMobile
              ? 'linear-gradient(to bottom, #0047AB, #6495ED)'
              : 'linear-gradient(to right, #0047AB, #6495ED)',
            zIndex: 1,
          }}
        />
      </Grow>
    </div>
  );
};

const Roadmap = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [maxHeight, setMaxHeight] = useState('auto');

  useEffect(() => {
    if (!isMobile) {
      const calculateMaxHeight = () => {
        let maxHeight = 0;
        roadmapData.forEach((milestone) => {
          const dummyElement = document.createElement('div');
          dummyElement.style.visibility = 'hidden';
          dummyElement.style.position = 'absolute';
          dummyElement.style.width = '30%';
          document.body.appendChild(dummyElement);

          const content = milestone.heading.map((item) => `
            <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
              <span style="margin-right: 10px;">•</span>
              <span>${item}</span>
            </div>
          `).join('');

          dummyElement.innerHTML = content;
          const height = dummyElement.offsetHeight;
          if (height > maxHeight) maxHeight = height;

          document.body.removeChild(dummyElement);
        });

        return `${maxHeight+10}px`;
      };

      setMaxHeight(calculateMaxHeight());
    }
  }, [isMobile]);

  return (
    <RoadmapContainer>
      <AnimatedTimelineLine />
      {roadmapData.map((milestone, index) => (
        <MilestoneWithAnimation 
          key={index} 
          milestone={milestone} 
          index={index}
          maxHeight={maxHeight}
        />
      ))}
    </RoadmapContainer>
  );
};

export default Roadmap;