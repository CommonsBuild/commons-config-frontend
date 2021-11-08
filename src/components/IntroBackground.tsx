import Image from 'next/image';
import { useRouter } from 'next/router';
import { AnimateSharedLayout, motion } from 'framer-motion';

function IntroBackground() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <div className="fixed w-full h-full z-10">
      <AnimateSharedLayout>
        {pathname === '/intro/1' && (
          <>
            <motion.div
              className="fixed -top-full -right-3/10 desktop:-top-9/10 desktop:-right-2/10"
              layoutId="firstAnimationLayout"
              initial={false}
              transition={{ duration: 1.2 }}
            >
              <Image
                src="/animation.png"
                layout="fixed"
                width="1246"
                height="1087"
              />
            </motion.div>
            <motion.div
              className="fixed -bottom-9/10 right-6/10"
              layoutId="secondAnimationLayout"
              initial={false}
              transition={{ duration: 1.2 }}
            >
              <Image
                src="/animation.png"
                layout="fixed"
                width="1246"
                height="1087"
              />
            </motion.div>
          </>
        )}
        {pathname === '/intro/2' && (
          <>
            <motion.div
              className="fixed -top-11/10 right-4/10 desktop:-top-full desktop:right-6/10"
              layoutId="firstAnimationLayout"
              initial={false}
              transition={{ duration: 1.2 }}
            >
              <Image
                className="rotate-15"
                src="/animation.png"
                layout="fixed"
                width="1246"
                height="1087"
              />
            </motion.div>
            <motion.div
              className="fixed -bottom-full right-2/10 desktop:-bottom-8/10 desktop:right-3/10"
              layoutId="secondAnimationLayout"
              initial={false}
              transition={{ duration: 1.2 }}
            >
              <Image
                className="rotate-15"
                src="/animation.png"
                layout="fixed"
                width="1246"
                height="1087"
              />
            </motion.div>
          </>
        )}
        {pathname === '/intro/3' && (
          <>
            <motion.div
              className="fixed -top-5/10 right-7/10 desktop:-top-3/10 desktop:right-8/10"
              layoutId="firstAnimationLayout"
              initial={false}
              animate={{ rotate: -135 }}
              transition={{ duration: 1.2 }}
            >
              <Image
                src="/animation.png"
                layout="fixed"
                width="1246"
                height="1087"
              />
            </motion.div>
            <motion.div
              className="fixed -bottom-7/10 right-0 desktop:-bottom-5/10 desktop:right-1/10"
              layoutId="secondAnimationLayout"
              initial={false}
              transition={{ duration: 1.2 }}
            >
              <Image
                className="rotate-15"
                src="/animation.png"
                layout="fixed"
                width="1246"
                height="1087"
              />
            </motion.div>
          </>
        )}
        {pathname === '/intro/4' && (
          <>
            <motion.div
              className="fixed -bottom-9/10 right-6/10"
              layoutId="firstAnimationLayout"
              initial={false}
              animate={{ rotate: -135 }}
              transition={{ duration: 1.2 }}
            >
              <Image
                src="/animation.png"
                layout="fixed"
                width="1246"
                height="1087"
              />
            </motion.div>
            <motion.div
              className="fixed -bottom-6/10 -right-3/10"
              layoutId="secondAnimationLayout"
              initial={false}
              transition={{ duration: 1.2 }}
            >
              <Image
                className="rotate-15"
                src="/animation.png"
                layout="fixed"
                width="1246"
                height="1087"
              />
            </motion.div>
          </>
        )}
      </AnimateSharedLayout>
    </div>
  );
}

export default IntroBackground;
