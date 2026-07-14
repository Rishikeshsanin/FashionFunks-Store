"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); event.currentTarget.reset(); }
  return sent ? <div className="contact-success"><span>✓</span><h2>Message noted.</h2><p>This demo has captured the interaction locally. No message was actually sent.</p><button className="text-button" type="button" onClick={() => setSent(false)}>Send another</button></div> : (
    <form className="contact-form" onSubmit={submit}>
      <label className="form-field"><span>Name</span><input name="name" autoComplete="name" required /></label>
      <label className="form-field"><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
      <label className="form-field"><span>What can we help with?</span><select name="topic" required><option value="">Choose a topic</option><option>Order question</option><option>Size and fit</option><option>Returns</option><option>Website feedback</option><option>Something else</option></select></label>
      <label className="form-field"><span>Message</span><textarea name="message" rows={6} minLength={10} required /></label>
      <button className="button button--primary" type="submit">Send demo message</button>
    </form>
  );
}
