// pages/index.js
import Head from 'next/head';
import Chatbot from '../components/Chatbot';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Abhishek Singh's Portfolio</title>
        <meta name="description" content="Abhishek Singh's Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome to My Portfolio</h1>
        {/* Other content */}
      </main>
      <Chatbot /> {/* Chatbot is always visible */}
    </div>
  );
}
