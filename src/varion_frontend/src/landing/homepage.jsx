import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { ConnectButton, ConnectDialog } from '@connect2ic/react';
import ArrowForwardIcon from '@mui/icons-material/KeyboardArrowRight';
import ICLogo from '../assets/ICLogoWhite.png'; 
import Roadmap from './roadmap';

const FeatureCard = ({ feature, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <Feature
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
        transition: { duration: 0.15, ease: 'easeOut' }
      }}
    >
      <FeatureIcon>{feature.icon}</FeatureIcon>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </Feature>
  );
};

const Homepage = () => {
  return (
    <Container>
      <Navbar>
        <Logo src="/varionlogo.png" alt="Varion Logo" />
        <StyledConnectButton>
          <ConnectButton className="connect-button">
            <ArrowForwardIcon />
            <span>Launch Varion</span>  
          </ConnectButton>
        </StyledConnectButton>
      </Navbar>
      <ConnectDialog />

      <Hero>
        <HeroContent>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Revolutionizing Healthcare with Decentralized AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Introducing a decentralized AI monitoring dashboard for hospitals. Elevate patient care and safety to unprecedented levels.
          </motion.p>
        </HeroContent>
      </Hero>

      <About>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Varion
        </motion.h2>
        <Features>
          {featuresData.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </Features>
      </About> 

      <RoadmapSection>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Varion's Roadmap
        </motion.h2>
        <Roadmap />
      </RoadmapSection>
      <Footer>
        <p>&copy; 2024 Varion. All rights reserved.</p>
        <FooterLinks>
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Contact Us</a>
        </FooterLinks>
        <LogoContainer>
          <img src={ICLogo} alt="IC Logo" />
        </LogoContainer>
      </Footer>
    </Container>
  );
};

const featuresData = [
  {
    title: 'AI-Powered Insights',
    description: 'Harness the power of AI to gain real-time insights into patient health and hospital operations.',
    icon: '🧠',
  },
  {
    title: 'Seamless Integration',
    description: 'Effortlessly integrate with existing hospital systems for a smooth transition to AI-driven care.',
    icon: '🔗',
  },
  {
    title: 'Enhanced Security',
    description: 'Utilize Internet Identity for secure digital identities, enhancing privacy without centralized passwords.',
    icon: '🔐',
  },
  {
    title: 'On-Chain Inference',
    description: 'Leverage on-chain ML models, made possible by the Internet Computer, for cutting-edge healthcare solutions.',
    icon: '🔄',
  },
];

const StyledConnectButton = styled.div`
  .connect-button {
    background: linear-gradient(45deg, #0066cc, #00a3ff);
    color: white;
    border: none;
    padding: 0.5rem 1.5rem;
    border-radius: 25px;
    cursor: pointer;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 102, 204, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: linear-gradient(45deg, #005cb8, #0095e8);
    }

    span {
      margin-right: 5px;
    }
  }
`;

const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  background-image: url('./gradientBg.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  z-index: 1000;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const Logo = styled.img`
  height: 40px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
`;

const Hero = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 2rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(45deg, #0066cc, #00ccff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1.2;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  p {
    font-size: 1.3rem;
    line-height: 1.6;
    color: #555;
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
  }
`;

const About = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(5px);
  }

  h2 {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.8rem;
    color: #0066cc;
    position: relative;
    z-index: 1;
    text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Feature = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h3 {
    margin: 1rem 0;
    font-size: 1.5rem;
    align-self: flex-start;
    color: #0066cc;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
    margin: 0;
    text-align: justify;
    hyphens: auto;
    word-break: break-word;
    color: #333;
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  transform: scale(1);
  transition: transform 0.15s ease-out;

  ${Feature}:hover & {
    transform: scale(1.2) rotate(5deg);
  }
`;

const RoadmapSection = styled.section`
  min-height: 100vh;
  padding: 3rem 2rem; // Reduced top padding
  margin-top: -3rem; // Added negative margin to move it up
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(5px);
  }

  h2 {
    text-align: center;
    margin-bottom: 2rem; // Reduced bottom margin
    font-size: 2.8rem;
    color: #0066cc;
    position: relative;
    z-index: 1;
    text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
  }
`;

const Footer = styled.footer`
  background-color: rgba(248, 249, 250, 0.9);
  padding: 3rem 2rem;
  text-align: center;
  position: relative;
  backdrop-filter: blur(5px);

  &::before {
    content: none;
  }
`;

const FooterLinks = styled.div`
  margin-top: 1.5rem;

  a {
    color: #0066cc;
    text-decoration: none;
    margin: 0 1rem;
    transition: color 0.3s, transform 0.3s;
    font-weight: 500;
    display: inline-block;

    &:hover {
      color: #0052a3;
      text-decoration: underline;
      transform: translateY(-2px);
    }
  }
`;

const LogoContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 20px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    background-color: rgba(0, 0, 0, 0.7); 
    padding: 15px;
    border-radius: 14px; 
  }
`;

export default Homepage;