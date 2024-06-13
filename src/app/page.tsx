"use client";

import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const Page = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          section.classList.add(styles.visible);
        } else {
          section.classList.remove(styles.visible);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Landing Page - Tech Company</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>Tech Company</div>
          <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
          <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
  <ul>
    <li><a href="#presentation" onClick={() => setMenuOpen(false)}>Home</a></li>
    <li><a href="#services" onClick={() => setMenuOpen(false)}>What We Do</a></li>
    <li><a href="#partners" onClick={() => setMenuOpen(false)}>Partners</a></li>
    <li><a href="#feedback" onClick={() => setMenuOpen(false)}>Feedback</a></li>
    <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact Us</a></li>
    <li><Link href="/dashboard">Dashboard 1</Link></li>
    <li><Link href="/dashboard2">Dashboard 2</Link></li>
    {isLoggedIn ? (
      <>
        <li><a href="/logout" onClick={() => { setIsLoggedIn(false); }}>Logout</a></li>
      </>
    ) : (
      <>
        <li><Link href="/login">Login</Link></li>
        <li><Link href="/register">Register</Link></li>
      </>
    )}
  </ul>
</nav>

        </div>
      </header>

      <main>
        <section id="presentation" className={styles.section}>
          <h1>Welcome to Our Tech Company</h1>
          <div className={styles.carousel}>
            <div className={styles.carouselItem}>Slide 1</div>
            <div className={styles.carouselItem}>Slide 2</div>
            <div className={styles.carouselItem}>Slide 3</div>
          </div>
        </section>

        <section id="services" className={styles.section}>
          <h2>What We Do</h2>
          <div className={styles.services}>
            <div className={styles.serviceItem}>Service 1</div>
            <div className={styles.serviceItem}>Service 2</div>
            <div className={styles.serviceItem}>Service 3</div>
            <div className={styles.serviceItem}>Service 4</div>
            <div className={styles.serviceItem}>Service 5</div>
            <div className={styles.serviceItem}>Service 6</div>
          </div>
        </section>

        <section id="partners" className={styles.section}>
          <h2>Our Partners</h2>
          <div className={styles.partners}>
            <div className={styles.partnerItem}>Partner 1</div>
            <div className={styles.partnerItem}>Partner 2</div>
            <div className={styles.partnerItem}>Partner 3</div>
            <div className={styles.partnerItem}>Partner 4</div>
          </div>
        </section>

        <section id="feedback" className={styles.section}>
          <h2>Feedback</h2>
          <div className={styles.feedback}>
            <div className={styles.feedbackItem}>Feedback 1</div>
            <div className={styles.feedbackItem}>Feedback 2</div>
            <div className={styles.feedbackItem}>Feedback 3</div>
          </div>
        </section>

        <section id="contact" className={styles.section}>
          <h2>Contact Us</h2>
          <form className={styles.contactForm}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message"></textarea>
            <button type="submit">Submit</button>
          </form>
        </section>
      </main>

      <footer className={styles.footer}>
        <ul>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default Page;
