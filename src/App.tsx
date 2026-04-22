import { useState } from 'react';
import { EnvelopeOverlay } from './components/EnvelopeOverlay';
import { HeroSection } from './components/HeroSection';
import { DetailsSection } from './components/DetailsSection';
import { GallerySection } from './components/GallerySection';
import { DressCodeSection } from './components/DressCodeSection';
import { RsvpSection } from './components/RsvpSection';
import { FooterSection } from './components/FooterSection';
import { TornPaper } from './components/TornPaper';

function App() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  return (
    <div className="relative min-h-screen bg-deep-grass-green overflow-hidden">
      {!envelopeOpened && (
        <EnvelopeOverlay onOpenComplete={() => setEnvelopeOpened(true)} />
      )}
      
      <main className={`transition-opacity duration-1000 ${envelopeOpened ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
        <TornPaper position="bottom" className="z-50 -mb-10">
          <HeroSection />
        </TornPaper>
        <TornPaper position="bottom" className="z-40 -mb-10">
          <DetailsSection />
        </TornPaper>
        <TornPaper position="bottom" className="z-30 -mb-10">
          <GallerySection />
        </TornPaper>
        <TornPaper position="bottom" className="z-20 -mb-10">
          <DressCodeSection />
        </TornPaper>
        <TornPaper position="bottom" className="z-10 -mb-10">
          <RsvpSection />
        </TornPaper>
        <div className="relative z-0">
          <FooterSection />
        </div>
      </main>
    </div>
  );
}

export default App;
