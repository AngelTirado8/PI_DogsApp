import React from 'react';
import styles from '../styles/Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInfo}>
        <div className={styles.leftContent}>
          <p>©2023 Mi Aplicacion de perros. Todos los derechos reservados.</p>
        </div>
        
      </div>
      <div className={styles.footerLink}>
      </div>
      <div className={styles.rightContent}>
          <p>Contacto: angelteduardov@gmail.com</p>
        </div>
    </footer>
  );
}

export default Footer;
