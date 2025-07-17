import { MessageCircle } from "lucide-react"

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/2348028686234?text=Hello%20FarmerGiant,%20I%20need%20help%20with%20farm%20equipment"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
