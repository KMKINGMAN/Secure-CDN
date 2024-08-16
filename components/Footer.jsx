import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Footer.module.css';
import { FaFacebook, FaLinkedinIn, FaTwitter } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="tw-py-6 md:tw-px-8 md:tw-py-0">
      <div className="tw-container tw-flex tw-flex-col tw-items-center tw-justify-between tw-gap-4 md:tw-h-24 md:tw-flex-row">
        <p className="tw-text-balance tw-text-center tw-text-sm tw-leading-loose tw-text-muted-foreground md:tw-text-left">
          Built by Muhammad Kurkar {" "}
          <a
            href={"https://github.com/kmkingman"}
            target="_blank"
            rel="noreferrer"
            className="tw-font-medium tw-underline tw-underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  )
};


export default Footer;