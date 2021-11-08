import Image from 'next/image';
import { useRouter } from 'next/router';
import { AnimateSharedLayout, motion } from 'framer-motion';

function IntroBackground() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <AnimateSharedLayout>
      {pathname === '/intro/1' && (
        <motion.div
          className="fixed desktop:top-0"
          style={{ top: '-105%', right: '-30%' }}
          layoutId="animationImg"
          initial={false}
          animate={{ rotate: 15 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/animation.png"
            layout="fixed"
            width="1246"
            height="1087"
          />
        </motion.div>
      )}
      {pathname === '/intro/2' && (
        <motion.div
          className="fixed"
          style={{ top: '-107.5%', right: '45%' }}
          layoutId="animationImg"
          initial={false}
          transition={{ duration: 0.6 }}
        >
          <Image
            className="rotate-15"
            src="/animation.png"
            layout="fixed"
            width="1246"
            height="1087"
          />
        </motion.div>
      )}
      {pathname === '/intro/3' && (
        <motion.div
          className="fixed"
          style={{ top: '-45%', right: '72.5%' }}
          layoutId="animationImg"
          initial={false}
          animate={{ rotate: -135 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/animation.png"
            layout="fixed"
            width="1246"
            height="1087"
          />
        </motion.div>
      )}
      {pathname === '/intro/4' && (
        <motion.div
          className="fixed"
          style={{ bottom: '-95%', right: '60%' }}
          layoutId="animationImg"
          initial={false}
          animate={{ rotate: -135 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/animation.png"
            layout="fixed"
            width="1246"
            height="1087"
          />
        </motion.div>
      )}
    </AnimateSharedLayout>
  );
}

export default IntroBackground;
