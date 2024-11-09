import * as React from "react";

interface EmailTemplateProps {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  phone,
  email,
  message,
}) => (
  <div>
    <p>
      Name: {name}
      <br />
      Phone: {phone}
      <br />
      Email: {email}
      <br />
      Message: {message}
    </p>
  </div>
);
