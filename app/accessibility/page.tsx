import InfoPage from '../../src/components/InfoPage';

const cards = [
  {
    title: 'Easy to browse',
    text: 'The site is designed with clear navigation, readable contrast, and simple route discovery for all users.',
  },
  {
    title: 'Keyboard friendly',
    text: 'Most core actions can be reached from the keyboard, including search inputs and route navigation.',
  },
  {
    title: 'Need assistance?',
    text: 'If you face an accessibility issue, contact our support team and share the page or action that needs attention.',
  },
];

export default function Page() {
  return (
    <InfoPage
      badge="Accessibility"
      title="Make HIcars easier to use for everyone."
      description="We aim to keep HIcars simple, readable, and navigable so more people can plan and book rides with confidence."
      cards={cards}
      ctaHref="/contact-us"
      ctaLabel="Contact Us"
    />
  );
}