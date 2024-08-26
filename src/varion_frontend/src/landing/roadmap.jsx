import React from 'react';
import { Box, Typography, Grow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useInView } from 'react-intersection-observer';

const RoadmapContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    padding: '40px 0',
    maxWidth: '100%',
    overflowX: 'auto',
    borderRadius: '15px',
});

const Milestone = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
    minWidth: '180px',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
    },
});

const Circle = styled(Box)(({ color, opacity = 1 }) => ({
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: color,
    opacity: opacity,
    marginBottom: '15px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.1)',
        boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
    },
}));

const roadmapData = [
    { quarter: "Q3 2024", color: '#0047AB', heading: 'Lorem' },
    { quarter: "Q4 2024", color: '#4169E1', heading: 'Lorem' },
    { quarter: "Q1 2025", color: '#6495ED', heading: 'Lorem' },
    { quarter: "Q2 2025", color: '#93b8f9', heading: 'Lorem' },
];

const MilestoneWithAnimation = ({ milestone, index }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div ref={ref}>
            <Grow
                in={inView}
                style={{ transformOrigin: '0 0 0' }}
                {...{ timeout: 1000 + index * 500 }}
            >
                <Milestone>
                    <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold', color: milestone.color, textAlign: 'center' }}>
                        {milestone.quarter}
                    </Typography>
                    <Circle color={milestone.color} />
                    <Typography variant="body1" align="center" style={{ fontWeight: 'medium' }}>
                        {milestone.heading}
                    </Typography>
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

    return (
        <div ref={ref} style={{ position: 'absolute', top: '50%', left: '90px', right: '90px' }}>
            <Grow
                in={inView}
                style={{ transformOrigin: '0 50% 0' }}
                {...{ timeout: 1000 }}
            >
                <Box
                    sx={{
                        height: '4px',
                        background: 'linear-gradient(to right, black, #e0e0e0)',
                        zIndex: 1,
                    }}
                />
            </Grow>
        </div>
    );
};

const Roadmap = () => {
    return (
        <RoadmapContainer>
            <AnimatedTimelineLine />
            {roadmapData.map((milestone, index) => (
                <MilestoneWithAnimation 
                    key={index} 
                    milestone={milestone} 
                    index={index} 
                />
            ))}
        </RoadmapContainer>
    );
};

export default Roadmap;