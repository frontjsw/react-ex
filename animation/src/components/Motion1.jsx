import { motion } from 'framer-motion';

import classes from './Motion1.module.css';

const Motion1 = () => <motion.div className={classes.circle} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} />;

export default Motion1;
