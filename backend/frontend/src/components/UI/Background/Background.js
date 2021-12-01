import React from 'react';
import Particles from 'react-particles-js';

const background = (props) => (
    <Particles
    id="tsparticles"
    options={{
      fpsLimit: 60,
      particles: {
        number: {
            value: 900,
        },
        color: {
            value: '#fff'
        },
        opacity: {
            value: 0.5,
            anim: {
                enable: true
            }
        },
        size: {
            value: 5,
            random: true,
            anim: {
                enable: true,
                speed: 4
            }
        },
        line_linked: {
            enable: false
        },
        move: {
            speed: 0.8
        }
      },
    }}>{props.children}</Particles>
)

export default background; 