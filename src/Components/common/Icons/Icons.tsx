import React from 'react';

// A common type for all icon props to allow for custom styling.
type IconProps = { className?: string };

// Each icon is defined as a separate, reusable React component.

export const LockIcon: React.FC<IconProps> = ({ className = "h-5 w-5 text-amber-400 inline-block mr-2" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
  </svg>
);

export const HomeIcon: React.FC<IconProps> = ({ className = "w-5 h-5 mr-3" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);

export const CodeIcon: React.FC<IconProps> = ({ className = "w-5 h-5 mr-3" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
);

export const ExamIcon: React.FC<IconProps> = ({ className = "w-5 h-5 mr-3" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
);

export const ProfileIcon: React.FC<IconProps> = ({ className = "w-5 h-5 mr-3" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);

export const LoginIcon: React.FC<IconProps> = ({ className = "w-5 h-5 mr-2" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
);

export const LogoutIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
);

// --- Topic Specific Icons ---

export const ReactIcon: React.FC<IconProps> = ({ className = "w-5 h-5 mr-3" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" stroke="#61DAFB" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" stroke="#61DAFB" strokeWidth="1.5"/><circle cx="12" cy="12" r="2" fill="#61DAFB"/></svg>
);

export const NodeIcon: React.FC<IconProps> = ({ className = "w-5 h-5 mr-3" }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.33.21l-9.12 5.25v10.5l9.12 5.25 9.12-5.25V5.46L12.33.21zM11.5 13.5v-3l-4 2v3l4-2zm1-3v3l4 2v-3l-4-2zm-1-1.5l4-2 4 2-4 2-4-2z" fill="#8CC84B"/></svg>
);

export const MongoIcon: React.FC<IconProps> = ({ className = "w-5 h-5 mr-3" }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm5-4c0 2.04-1.53 3.72-3.5 3.93v-7.87c1.97.2 3.5 1.89 3.5 3.94z" fill="#4DB33D"/></svg>
);

export const JsIcon: React.FC<IconProps> = ({ className = "w-5 h-5 mr-3" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="3" fill="#F7DF1E"/><path d="M6.5 18H9c.3 0 .5-.2.5-.5V12c0-.3-.2-.5-.5-.5h-1c-.3 0-.5.2-.5.5v5.5c0 .3-.2.5-.5.5h-1V18zm6.5 0h.5c.3 0 .5-.2.5-.5v-5c0-.3-.2-.5-.5-.5h-2.5V11c0-.3-.2-.5-.5-.5h-1c-.3 0-.5.2-.5.5v1.5H12c.3 0 .5.2.5.5v5c0 .3.2.5.5.5z" fill="#000"/></svg>
);

export const HtmlIcon: React.FC<IconProps> = ({ className = "w-5 h-5 mr-3" }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2 2h20v20H2V2zm3 3v14h14V5H5zm2 2h2v2H7V7zm4 0h2v2h-2V7zm4 0h2v2h-2V7zm-8 4h10v2H7v-2zm0 4h10v2H7v-2z" fill="#E44D26"/></svg>
);

export const CssIcon: React.FC<IconProps> = ({ className = "w-5 h-5 mr-3" }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2 2h20v20H2V2zm3 3v14h14V5H5zm2 2h10v2H7V7zm0 4h5v2H7v-2zm0 4h10v2H7v-2z" fill="#2965f1"/></svg>
);

// --- Newly Added Icons ---

export const TsIcon: React.FC<IconProps> = ({ className = "w-5 h-5 mr-3" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="3" fill="#3178C6"/><path d="M8.5 7.5h7v2h-2.5v9h-2v-9H8.5v-2z" fill="white"/></svg>
);

export const TailwindIcon: React.FC<IconProps> = ({ className = "w-5 h-5 mr-3" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3.5 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm7 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="#38BDF8"/></svg>
);

export const NextjsIcon: React.FC<IconProps> = ({ className = "w-5 h-5 mr-3" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="black"/><path d="M16.5 18h-2.2l-4.3-7.2V18H8V6h2.2l4.3 7.2V6H17v12h-.5z" fill="white"/></svg>
);