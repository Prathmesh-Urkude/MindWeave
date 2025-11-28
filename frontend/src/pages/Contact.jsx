import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone } from "lucide-react";

export default function Contact() {
  return (
    <>
      <Header />

      {/* Main Section */}
      <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col justify-center items-center px-4 pt-28">
        
        {/* Title */}
        <motion.h1
          className="text-5xl font-extrabold text-transparent bg-clip-text 
          bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4 tracking-tight"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Get in Touch
        </motion.h1>

        <p className="text-gray-600 text-lg max-w-xl text-center mb-12">
          We’re here to support your experience with MindWeave. Reach out anytime!
        </p>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl w-full">
          {[
            {
              icon: (
                <Mail className="w-12 h-12 text-blue-500 group-hover:text-blue-700 transition" />
              ),
              title: "Email",
              info: "support@mindweave.com",
              gradient: "from-blue-500/20 to-blue-800/10"
            },
            {
              icon: (
                <Phone className="w-12 h-12 text-green-500 group-hover:text-green-700 transition" />
              ),
              title: "Phone",
              info: "+91 98765 43210",
              gradient: "from-green-500/20 to-green-800/10"
            },
            {
              icon: (
                <MessageCircle className="w-12 h-12 text-purple-500 group-hover:text-purple-700 transition" />
              ),
              title: "Chat Support",
              info: "Live chat — Coming Soon!",
              gradient: "from-purple-500/20 to-purple-800/10"
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, translateY: -6 }}
              viewport={{ once: true }}
              className={`
                group bg-white/60 backdrop-blur-xl border border-gray-200 
                rounded-3xl p-8 shadow-lg hover:shadow-2xl 
                hover:border-transparent transition-all 
                bg-gradient-to-br ${item.gradient}
              `}
            >
              <div className="flex justify-center mb-5">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-700 text-sm">{item.info}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
