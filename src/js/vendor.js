import 'aos/dist/aos.css';
import AOS from 'aos';
import { AOSRefresh, addAutoRefresh } from './utils.js';
import { gsap } from 'gsap';
import { RoughEase } from 'gsap/EasePack';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { CustomEase } from 'gsap/CustomEase';

export * from 'gsap';

AOS.init();
AOSRefresh();
addAutoRefresh();

gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(RoughEase);
gsap.registerPlugin(CustomEase);