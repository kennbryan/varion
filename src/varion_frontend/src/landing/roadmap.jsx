import React from 'react';
import { Box, Typography, Grow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useInView } from 'react-intersection-observer';

const RoadmapContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'relative',
    padding: '60px 0 40px', // Increased top padding for quarter text
    width: '100%',
    borderRadius: '15px',
});

const Milestone = styled(Box)(({ position }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
    width: '30%',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
    },
    left: position === 'left' ? '0%' : position === 'center' ? '35%' : '70%',
}));

const Circle = styled(Box)(({ color, opacity = 1 }) => ({
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: color,
    opacity: opacity,
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.1)',
        boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
    },
    position: 'absolute',
    top: '32px', // Center the circle on the line
}));

const TextBox = styled(Box)({
    width: '100%',
    padding: '10px',
    backgroundColor: 'transparent',
    marginTop: '30px', // Space for the circle
});

const roadmapData = [
    { 
        quarter: "Q3 2024", 
        color: '#0047AB', 
        heading: 'Implementing [Internet Identity].\nImplementing [On-chain Model Inference/Decentralized AI].\nProviding [Data Insights] and [Graphical Reports] on Dashboard.',
        position: 'left'
    },
    { 
        quarter: "Q4-Q1 2025", 
        color: '#4169E1', 
        heading: '[Pre-seed] Funding.\nImplementing [Proxy Bridge] to connect [Varion Web3] to [Web2 technologies].\nConducting open beta to [Testnet].',
        position: 'center'
    },
    { 
        quarter: "Q2-Q3 2025", 
        color: '#6495ED', 
        heading: 'Implementing [Fully on-chain Training] & [Modal Inference/Pure Decentralized AI].\nJoining on-site blockchain events to [promote Varion] & [ICP Capabilities].\nReleasing to [Mainnet].',
        position: 'right'
    },
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
                <Milestone position={milestone.position}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        style={{
                            fontWeight: 'bold',
                            color: milestone.color,
                            textAlign: 'center',
                            marginBottom: '10px', // Adjust margin as needed
                        }}
                    >
                        {milestone.quarter}
                    </Typography>
                    <Circle color={milestone.color} />
                    <TextBox>
                        <Typography
                            variant="body1"
                            align="center"
                            style={{
                                fontWeight: 'medium',
                                whiteSpace: 'pre-line',
                            }}
                        >
                            {milestone.heading.split('[').map((part, i) =>
                                i === 0 ? part : (
                                    <React.Fragment key={i}>
                                        <strong>{part.split(']')[0]}</strong>
                                        {part.split(']')[1]}
                                    </React.Fragment>
                                )
                            )}
                        </Typography>
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

    return (
        <div ref={ref} style={{ position: 'absolute', top: '105px', left: '15%', right: '15%' }}>
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