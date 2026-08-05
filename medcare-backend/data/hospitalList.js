const hospitals = [
  {
    name: "AIIMS Patna",
    brief: [
      "Premier government medical institute in Bihar.",
      "State-of-the-art specialized care units.",
      "Extensive research and training facilities."
    ],
    address: "Phulwari Sharif, Patna",
    city: "Patna",
    location: { lat: 25.5684, lng: 85.0440 },
    contactNumber: "+91 612 245 1006",
    email: "contact@aiimspatna.org",
    hospitalType: "Government",
    facilities: ["24/7 Emergency", "ICU", "Trauma Care", "Blood Bank", "Radiology"],
    rating: 4.7,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Rajesh Kumar",
        isVerified: true,
        specialty: "Cardiologist",
        experienceYears: 15,
        rating: 4.8,
        reviewCount: 320,
        consultationFee: 500,
        isAvailableToday: true,
        availableSlots: ["09:00 AM", "11:30 AM", "02:00 PM"]
      },
      {
        name: "Dr. Neha Sharma",
        isVerified: true,
        specialty: "Neurologist",
        experienceYears: 12,
        rating: 4.6,
        reviewCount: 210,
        consultationFee: 500,
        isAvailableToday: true,
        availableSlots: ["10:00 AM", "01:00 PM", "03:00 PM"]
      },
      {
        name: "Dr. Anil Singh",
        isVerified: true,
        specialty: "Orthopedic",
        experienceYears: 18,
        rating: 4.7,
        reviewCount: 400,
        consultationFee: 500,
        isAvailableToday: false,
        availableSlots: []
      },
      {
        name: "Dr. Priya Ranjan",
        isVerified: true,
        specialty: "Oncologist",
        experienceYears: 10,
        rating: 4.9,
        reviewCount: 150,
        consultationFee: 500,
        isAvailableToday: true,
        availableSlots: ["09:30 AM", "12:30 PM", "04:30 PM"]
      },
      {
        name: "Dr. Sanjay Gupta",
        isVerified: true,
        specialty: "Pediatrician",
        experienceYears: 20,
        rating: 4.8,
        reviewCount: 550,
        consultationFee: 500,
        isAvailableToday: true,
        availableSlots: ["10:30 AM", "02:30 PM"]
      }
    ]
  },
  {
    name: "IGIMS Patna",
    brief: [
      "Indira Gandhi Institute of Medical Sciences.",
      "Top tertiary care hospital in the state.",
      "Comprehensive diagnostic and surgical centers."
    ],
    address: "Sheikhpura, Patna",
    city: "Patna",
    location: { lat: 25.6033, lng: 85.0886 },
    contactNumber: "+91 612 229 7099",
    email: "director@igims.org",
    hospitalType: "Government",
    facilities: ["24/7 Emergency", "ICU", "Dialysis Center", "Blood Bank", "Advanced Surgery"],
    rating: 4.5,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Manoj Tiwari",
        isVerified: true,
        specialty: "Gastroenterologist",
        experienceYears: 22,
        rating: 4.8,
        reviewCount: 600,
        consultationFee: 400,
        isAvailableToday: true,
        availableSlots: ["08:30 AM", "11:00 AM", "02:00 PM"]
      },
      {
        name: "Dr. Sneha Verma",
        isVerified: true,
        specialty: "Gynecologist",
        experienceYears: 14,
        rating: 4.7,
        reviewCount: 340,
        consultationFee: 400,
        isAvailableToday: true,
        availableSlots: ["09:00 AM", "12:00 PM", "03:00 PM"]
      },
      {
        name: "Dr. Vikas Jha",
        isVerified: true,
        specialty: "Urologist",
        experienceYears: 16,
        rating: 4.5,
        reviewCount: 220,
        consultationFee: 400,
        isAvailableToday: true,
        availableSlots: ["10:00 AM", "01:00 PM"]
      },
      {
        name: "Dr. Amitabh Pandey",
        isVerified: true,
        specialty: "Dermatologist",
        experienceYears: 9,
        rating: 4.6,
        reviewCount: 180,
        consultationFee: 400,
        isAvailableToday: false,
        availableSlots: []
      },
      {
        name: "Dr. Shalini Singh",
        isVerified: true,
        specialty: "Psychiatrist",
        experienceYears: 11,
        rating: 4.8,
        reviewCount: 190,
        consultationFee: 400,
        isAvailableToday: true,
        availableSlots: ["11:30 AM", "03:30 PM", "05:00 PM"]
      }
    ]
  },
  {
    name: "Paras HMRI Hospital",
    brief: [
      "Leading corporate multi-specialty hospital.",
      "First hospital in Bihar with a PET CT.",
      "Excellence in oncology and cardiology."
    ],
    address: "Raja Bazar, Bailey Road, Patna",
    city: "Patna",
    location: { lat: 25.6067, lng: 85.0837 },
    contactNumber: "+91 612 710 7777",
    email: "info@parashospitals.com",
    hospitalType: "Private",
    facilities: ["24/7 Emergency", "ICU", "Cath Lab", "PET CT", "NICU"],
    rating: 4.4,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Rajiv Kumar",
        isVerified: true,
        specialty: "Cardio Thoracic Surgeon",
        experienceYears: 25,
        rating: 4.9,
        reviewCount: 850,
        consultationFee: 1000,
        isAvailableToday: true,
        availableSlots: ["10:00 AM", "01:00 PM", "04:00 PM"]
      },
      {
        name: "Dr. Shweta Rai",
        isVerified: true,
        specialty: "Oncologist",
        experienceYears: 15,
        rating: 4.7,
        reviewCount: 410,
        consultationFee: 900,
        isAvailableToday: true,
        availableSlots: ["11:00 AM", "02:30 PM", "05:30 PM"]
      },
      {
        name: "Dr. Amit Kumar",
        isVerified: true,
        specialty: "Neurologist",
        experienceYears: 12,
        rating: 4.5,
        reviewCount: 290,
        consultationFee: 800,
        isAvailableToday: true,
        availableSlots: ["09:00 AM", "12:00 PM", "03:00 PM"]
      },
      {
        name: "Dr. Pooja Yadav",
        isVerified: true,
        specialty: "Endocrinologist",
        experienceYears: 10,
        rating: 4.6,
        reviewCount: 180,
        consultationFee: 800,
        isAvailableToday: true,
        availableSlots: ["10:30 AM", "01:30 PM"]
      },
      {
        name: "Dr. Sameer Khan",
        isVerified: true,
        specialty: "Orthopedic",
        experienceYears: 18,
        rating: 4.8,
        reviewCount: 520,
        consultationFee: 900,
        isAvailableToday: false,
        availableSlots: []
      }
    ]
  },
  {
    name: "Medanta Hospital",
    brief: [
      "World-class healthcare infrastructure.",
      "Advanced robotic surgery systems.",
      "Specialized heart and liver institutes."
    ],
    address: "Kankarbagh Main Road, Patna",
    city: "Patna",
    location: { lat: 25.6025, lng: 85.1583 },
    contactNumber: "+91 612 350 5050",
    email: "patna@medanta.org",
    hospitalType: "Private",
    facilities: ["24/7 Emergency", "ICU", "Robotic Surgery", "Organ Transplant", "Blood Bank"],
    rating: 4.6,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Arun Pratap",
        isVerified: true,
        specialty: "Hepatologist",
        experienceYears: 20,
        rating: 4.9,
        reviewCount: 750,
        consultationFee: 1200,
        isAvailableToday: true,
        availableSlots: ["10:00 AM", "12:00 PM", "04:00 PM"]
      },
      {
        name: "Dr. Sunita Mishra",
        isVerified: true,
        specialty: "Cardiologist",
        experienceYears: 16,
        rating: 4.8,
        reviewCount: 460,
        consultationFee: 1000,
        isAvailableToday: true,
        availableSlots: ["11:00 AM", "02:00 PM", "05:00 PM"]
      },
      {
        name: "Dr. Prakash Sinha",
        isVerified: true,
        specialty: "Nephrologist",
        experienceYears: 14,
        rating: 4.7,
        reviewCount: 310,
        consultationFee: 1000,
        isAvailableToday: true,
        availableSlots: ["09:00 AM", "01:00 PM"]
      },
      {
        name: "Dr. Kriti Anand",
        isVerified: true,
        specialty: "Dermatologist",
        experienceYears: 8,
        rating: 4.5,
        reviewCount: 190,
        consultationFee: 800,
        isAvailableToday: false,
        availableSlots: []
      },
      {
        name: "Dr. Rohan Das",
        isVerified: true,
        specialty: "Pulmonologist",
        experienceYears: 11,
        rating: 4.6,
        reviewCount: 230,
        consultationFee: 900,
        isAvailableToday: true,
        availableSlots: ["10:30 AM", "01:30 PM", "03:30 PM"]
      }
    ]
  },
  {
    name: "Kurji Holy Family Hospital",
    brief: [
      "Historic trust-based missionary hospital.",
      "Affordable and compassionate care.",
      "Large nursing school attached."
    ],
    address: "Kurji, Sadaquat Ashram, Patna",
    city: "Patna",
    location: { lat: 25.6375, lng: 85.1100 },
    contactNumber: "+91 612 226 2112",
    email: "kurjihospital@gmail.com",
    hospitalType: "Trust",
    facilities: ["24/7 Emergency", "Maternity Wing", "NICU", "Blood Bank"],
    rating: 4.3,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Sister Mary",
        isVerified: true,
        specialty: "Gynecologist",
        experienceYears: 30,
        rating: 4.9,
        reviewCount: 1200,
        consultationFee: 300,
        isAvailableToday: true,
        availableSlots: ["09:00 AM", "11:00 AM", "02:00 PM"]
      },
      {
        name: "Dr. Peter Paul",
        isVerified: true,
        specialty: "General Surgeon",
        experienceYears: 22,
        rating: 4.6,
        reviewCount: 450,
        consultationFee: 300,
        isAvailableToday: true,
        availableSlots: ["10:00 AM", "12:30 PM"]
      },
      {
        name: "Dr. Reena Prasad",
        isVerified: true,
        specialty: "Pediatrician",
        experienceYears: 15,
        rating: 4.7,
        reviewCount: 320,
        consultationFee: 300,
        isAvailableToday: true,
        availableSlots: ["09:30 AM", "01:30 PM", "04:00 PM"]
      },
      {
        name: "Dr. Alok Nath",
        isVerified: true,
        specialty: "Physician",
        experienceYears: 20,
        rating: 4.5,
        reviewCount: 210,
        consultationFee: 300,
        isAvailableToday: true,
        availableSlots: ["11:00 AM", "03:00 PM"]
      },
      {
        name: "Dr. Sumit Ranjan",
        isVerified: true,
        specialty: "Orthopedic",
        experienceYears: 10,
        rating: 4.4,
        reviewCount: 150,
        consultationFee: 300,
        isAvailableToday: false,
        availableSlots: []
      }
    ]
  },
  {
    name: "Ford Hospital",
    brief: [
      "Modern healthcare facility with advanced diagnostic tools.",
      "Renowned for orthopedic and spine surgeries.",
      "Accessible 24/7 trauma response team."
    ],
    address: "New Bypass Road, Khemnichak, Patna",
    city: "Patna",
    location: { lat: 25.5900, lng: 85.1600 },
    contactNumber: "+91 612 234 4000",
    email: "info@fordhospital.com",
    hospitalType: "Private",
    facilities: ["24/7 Emergency", "ICU", "Trauma Care", "Modular OTs", "Pharmacy"],
    rating: 4.2,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Ashish Chaudhary",
        isVerified: true,
        specialty: "Orthopedic",
        experienceYears: 18,
        rating: 4.8,
        reviewCount: 420,
        consultationFee: 600,
        isAvailableToday: true,
        availableSlots: ["10:30 AM", "01:30 PM", "05:00 PM"]
      },
      {
        name: "Dr. Nupur Singh",
        isVerified: true,
        specialty: "Gynecologist",
        experienceYears: 12,
        rating: 4.5,
        reviewCount: 230,
        consultationFee: 600,
        isAvailableToday: true,
        availableSlots: ["09:00 AM", "12:00 PM"]
      },
      {
        name: "Dr. Kunal Seth",
        isVerified: true,
        specialty: "Neurologist",
        experienceYears: 14,
        rating: 4.6,
        reviewCount: 310,
        consultationFee: 700,
        isAvailableToday: false,
        availableSlots: []
      },
      {
        name: "Dr. Vivek Sharma",
        isVerified: true,
        specialty: "Cardiologist",
        experienceYears: 16,
        rating: 4.7,
        reviewCount: 380,
        consultationFee: 700,
        isAvailableToday: true,
        availableSlots: ["11:00 AM", "03:00 PM", "06:00 PM"]
      },
      {
        name: "Dr. Ritu Jha",
        isVerified: true,
        specialty: "Pediatrician",
        experienceYears: 10,
        rating: 4.4,
        reviewCount: 190,
        consultationFee: 500,
        isAvailableToday: true,
        availableSlots: ["09:30 AM", "12:30 PM"]
      }
    ]
  },
  {
    name: "Ruban Memorial Hospital",
    brief: [
      "NABL & NABH accredited hospital.",
      "Renowned urology and nephrology wings.",
      "Advanced critical care support."
    ],
    address: "Patliputra Kurji Road, Patliputra Colony, Patna",
    city: "Patna",
    location: { lat: 25.6263, lng: 85.1070 },
    contactNumber: "+91 612 227 0000",
    email: "contact@ruban.org.in",
    hospitalType: "Private",
    facilities: ["24/7 Emergency", "ICU", "Dialysis Center", "Blood Bank", "Endoscopy"],
    rating: 4.4,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Satyajeet Singh",
        isVerified: true,
        specialty: "Urologist",
        experienceYears: 22,
        rating: 4.9,
        reviewCount: 610,
        consultationFee: 800,
        isAvailableToday: true,
        availableSlots: ["09:00 AM", "01:00 PM", "04:00 PM"]
      },
      {
        name: "Dr. Pallavi Sinha",
        isVerified: true,
        specialty: "Nephrologist",
        experienceYears: 15,
        rating: 4.7,
        reviewCount: 340,
        consultationFee: 800,
        isAvailableToday: true,
        availableSlots: ["10:30 AM", "02:30 PM"]
      },
      {
        name: "Dr. Anand Kumar",
        isVerified: true,
        specialty: "Cardiologist",
        experienceYears: 17,
        rating: 4.6,
        reviewCount: 290,
        consultationFee: 800,
        isAvailableToday: true,
        availableSlots: ["11:00 AM", "03:00 PM", "05:00 PM"]
      },
      {
        name: "Dr. Deepika Singh",
        isVerified: true,
        specialty: "Gynecologist",
        experienceYears: 11,
        rating: 4.5,
        reviewCount: 210,
        consultationFee: 700,
        isAvailableToday: false,
        availableSlots: []
      },
      {
        name: "Dr. Ramesh Patel",
        isVerified: true,
        specialty: "General Surgeon",
        experienceYears: 14,
        rating: 4.6,
        reviewCount: 250,
        consultationFee: 700,
        isAvailableToday: true,
        availableSlots: ["09:30 AM", "12:30 PM", "04:30 PM"]
      }
    ]
  },
  {
    name: "Mahavir Vatsalya Aspatal",
    brief: [
      "Run by the renowned Mahavir Mandir Trust.",
      "Specializes in pediatric and maternal care.",
      "Highly affordable treatment costs."
    ],
    address: "LCT Ghat, Main Road, Patna",
    city: "Patna",
    location: { lat: 25.6200, lng: 85.1150 },
    contactNumber: "+91 612 226 1000",
    email: "info@mahavirvatsalya.com",
    hospitalType: "Trust",
    facilities: ["24/7 Emergency", "NICU", "PICU", "Maternity Wing", "Blood Bank"],
    rating: 4.5,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Anil Tiwari",
        isVerified: true,
        specialty: "Pediatrician",
        experienceYears: 20,
        rating: 4.8,
        reviewCount: 520,
        consultationFee: 200,
        isAvailableToday: true,
        availableSlots: ["10:00 AM", "01:00 PM", "04:00 PM"]
      },
      {
        name: "Dr. Suman Devi",
        isVerified: true,
        specialty: "Gynecologist",
        experienceYears: 18,
        rating: 4.7,
        reviewCount: 410,
        consultationFee: 200,
        isAvailableToday: true,
        availableSlots: ["09:00 AM", "12:00 PM", "03:00 PM"]
      },
      {
        name: "Dr. Kamal Nath",
        isVerified: true,
        specialty: "Physician",
        experienceYears: 15,
        rating: 4.6,
        reviewCount: 310,
        consultationFee: 200,
        isAvailableToday: true,
        availableSlots: ["11:00 AM", "02:00 PM", "05:00 PM"]
      },
      {
        name: "Dr. Vinay Kumar",
        isVerified: true,
        specialty: "Orthopedic",
        experienceYears: 12,
        rating: 4.5,
        reviewCount: 190,
        consultationFee: 200,
        isAvailableToday: false,
        availableSlots: []
      },
      {
        name: "Dr. Rekha Kumari",
        isVerified: true,
        specialty: "Dermatologist",
        experienceYears: 10,
        rating: 4.4,
        reviewCount: 140,
        consultationFee: 200,
        isAvailableToday: true,
        availableSlots: ["10:30 AM", "01:30 PM"]
      }
    ]
  },
  {
    name: "Udayan Hospital",
    brief: [
      "Boutique multi-specialty care in central Patna.",
      "Dedicated mother and child care units.",
      "Minimal access surgery specialists."
    ],
    address: "West Boring Canal Road, Patna",
    city: "Patna",
    location: { lat: 25.6181, lng: 85.1205 },
    contactNumber: "+91 612 255 2000",
    email: "helpdesk@udayanhospital.com",
    hospitalType: "Private",
    facilities: ["24/7 Emergency", "ICU", "Laparoscopy Center", "Pharmacy"],
    rating: 4.1,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. P. K. Sinha",
        isVerified: true,
        specialty: "General Surgeon",
        experienceYears: 16,
        rating: 4.7,
        reviewCount: 220,
        consultationFee: 600,
        isAvailableToday: true,
        availableSlots: ["10:00 AM", "02:00 PM", "05:00 PM"]
      },
      {
        name: "Dr. Archana Singh",
        isVerified: true,
        specialty: "Gynecologist",
        experienceYears: 14,
        rating: 4.6,
        reviewCount: 310,
        consultationFee: 600,
        isAvailableToday: true,
        availableSlots: ["11:00 AM", "03:00 PM"]
      },
      {
        name: "Dr. Saurabh Jain",
        isVerified: true,
        specialty: "Cardiologist",
        experienceYears: 10,
        rating: 4.5,
        reviewCount: 180,
        consultationFee: 700,
        isAvailableToday: false,
        availableSlots: []
      },
      {
        name: "Dr. Megha Ray",
        isVerified: true,
        specialty: "Pediatrician",
        experienceYears: 8,
        rating: 4.4,
        reviewCount: 120,
        consultationFee: 500,
        isAvailableToday: true,
        availableSlots: ["09:30 AM", "12:30 PM"]
      },
      {
        name: "Dr. Hitesh Verma",
        isVerified: true,
        specialty: "Orthopedic",
        experienceYears: 12,
        rating: 4.3,
        reviewCount: 150,
        consultationFee: 600,
        isAvailableToday: true,
        availableSlots: ["10:30 AM", "01:30 PM", "04:30 PM"]
      }
    ]
  },
  {
    name: "Big Apollo Spectra Hospitals",
    brief: [
      "Apollo's short-stay surgical network.",
      "Expertise in ENT, Orthopedics, and Urology.",
      "Advanced ICUs and zero-infection OT zones."
    ],
    address: "Agam Kuan, Patna",
    city: "Patna",
    location: { lat: 25.5990, lng: 85.1950 },
    contactNumber: "+91 612 255 1111",
    email: "info.patna@apollospectra.com",
    hospitalType: "Private",
    facilities: ["24/7 Emergency", "ICU", "Modular OT", "In-house Pharmacy", "Diagnostics"],
    rating: 4.3,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Nishant Kumar",
        isVerified: true,
        specialty: "ENT Specialist",
        experienceYears: 14,
        rating: 4.8,
        reviewCount: 290,
        consultationFee: 600,
        isAvailableToday: true,
        availableSlots: ["09:00 AM", "12:00 PM", "03:00 PM"]
      },
      {
        name: "Dr. Aditya Jha",
        isVerified: true,
        specialty: "Orthopedic",
        experienceYears: 17,
        rating: 4.6,
        reviewCount: 380,
        consultationFee: 700,
        isAvailableToday: true,
        availableSlots: ["10:30 AM", "01:30 PM", "05:00 PM"]
      },
      {
        name: "Dr. Preeti Sharma",
        isVerified: true,
        specialty: "Gynecologist",
        experienceYears: 11,
        rating: 4.5,
        reviewCount: 220,
        consultationFee: 600,
        isAvailableToday: false,
        availableSlots: []
      },
      {
        name: "Dr. Vikas Singh",
        isVerified: true,
        specialty: "General Surgeon",
        experienceYears: 15,
        rating: 4.7,
        reviewCount: 310,
        consultationFee: 600,
        isAvailableToday: true,
        availableSlots: ["10:00 AM", "02:00 PM"]
      },
      {
        name: "Dr. Manish Ranjan",
        isVerified: true,
        specialty: "Urologist",
        experienceYears: 13,
        rating: 4.6,
        reviewCount: 190,
        consultationFee: 700,
        isAvailableToday: true,
        availableSlots: ["11:00 AM", "04:00 PM"]
      }
    ]
  },
  {
    name: "AIIMS New Delhi",
    brief: [
      "India's most prestigious medical institution.",
      "Comprehensive research and specialized treatments.",
      "World-class faculty and cutting-edge tech."
    ],
    address: "Ansari Nagar, New Delhi",
    city: "Delhi",
    location: { lat: 28.5672, lng: 77.2100 },
    contactNumber: "+91 11 2658 8500",
    email: "contact@aiims.edu",
    hospitalType: "Government",
    facilities: ["24/7 Emergency", "Trauma Center", "Organ Transplant", "Advanced ICU", "Research Labs"],
    rating: 4.8,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Randeep Guleria",
        isVerified: true,
        specialty: "Pulmonologist",
        experienceYears: 30,
        rating: 4.9,
        reviewCount: 1500,
        consultationFee: 500,
        isAvailableToday: true,
        availableSlots: ["10:00 AM", "01:00 PM"]
      },
      {
        name: "Dr. Sandeep Vaishya",
        isVerified: true,
        specialty: "Neurosurgeon",
        experienceYears: 25,
        rating: 4.9,
        reviewCount: 1200,
        consultationFee: 500,
        isAvailableToday: true,
        availableSlots: ["09:00 AM", "12:00 PM", "03:00 PM"]
      },
      {
        name: "Dr. Alka Kriplani",
        isVerified: true,
        specialty: "Gynecologist",
        experienceYears: 32,
        rating: 4.8,
        reviewCount: 950,
        consultationFee: 500,
        isAvailableToday: false,
        availableSlots: []
      },
      {
        name: "Dr. Nikhil Tandon",
        isVerified: true,
        specialty: "Endocrinologist",
        experienceYears: 28,
        rating: 4.8,
        reviewCount: 890,
        consultationFee: 500,
        isAvailableToday: true,
        availableSlots: ["11:00 AM", "02:00 PM", "04:00 PM"]
      },
      {
        name: "Dr. Ashok Seth",
        isVerified: true,
        specialty: "Cardiologist",
        experienceYears: 35,
        rating: 4.9,
        reviewCount: 2000,
        consultationFee: 500,
        isAvailableToday: true,
        availableSlots: ["09:30 AM", "01:30 PM"]
      }
    ]
  },
  {
    name: "Safdarjung Hospital",
    brief: [
      "One of the largest government hospitals in India.",
      "Renowned Burns and Plastic Surgery department.",
      "High volume OPD and critical care units."
    ],
    address: "Ansari Nagar East, New Delhi",
    city: "Delhi",
    location: { lat: 28.5685, lng: 77.2065 },
    contactNumber: "+91 11 2616 5060",
    email: "safdarjung@nic.in",
    hospitalType: "Government",
    facilities: ["24/7 Emergency", "Burns Unit", "Maternity Wing", "Blood Bank", "Trauma Care"],
    rating: 4.2,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Maneesh Singhal",
        isVerified: true,
        specialty: "Plastic Surgeon",
        experienceYears: 22,
        rating: 4.7,
        reviewCount: 450,
        consultationFee: 200,
        isAvailableToday: true,
        availableSlots: ["10:00 AM", "12:00 PM", "03:00 PM"]
      },
      {
        name: "Dr. Karun Jain",
        isVerified: true,
        specialty: "Orthopedic",
        experienceYears: 18,
        rating: 4.6,
        reviewCount: 380,
        consultationFee: 200,
        isAvailableToday: true,
        availableSlots: ["09:00 AM", "01:00 PM", "04:00 PM"]
      },
      {
        name: "Dr. Sunita Sharma",
        isVerified: true,
        specialty: "Gynecologist",
        experienceYears: 20,
        rating: 4.5,
        reviewCount: 310,
        consultationFee: 200,
        isAvailableToday: false,
        availableSlots: []
      },
      {
        name: "Dr. Ramesh Meena",
        isVerified: true,
        specialty: "General Surgeon",
        experienceYears: 15,
        rating: 4.4,
        reviewCount: 220,
        consultationFee: 200,
        isAvailableToday: true,
        availableSlots: ["11:00 AM", "02:30 PM"]
      },
      {
        name: "Dr. Ankur Verma",
        isVerified: true,
        specialty: "Pediatrician",
        experienceYears: 12,
        rating: 4.6,
        reviewCount: 290,
        consultationFee: 200,
        isAvailableToday: true,
        availableSlots: ["09:30 AM", "12:30 PM", "03:30 PM"]
      }
    ]
  },
  {
    name: "Indraprastha Apollo Hospitals",
    brief: [
      "JCI-accredited multi-specialty corporate hospital.",
      "Pioneers in organ transplantation.",
      "Comprehensive oncology and cardiology centers."
    ],
    address: "Sarita Vihar, Delhi Mathura Road, New Delhi",
    city: "Delhi",
    location: { lat: 28.5303, lng: 77.2882 },
    contactNumber: "+91 11 2692 5858",
    email: "infodelhi@apollohospitals.com",
    hospitalType: "Private",
    facilities: ["24/7 Emergency", "Organ Transplant", "Robotic Surgery", "NICU", "Blood Bank"],
    rating: 4.6,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Anupam Sibal",
        isVerified: true,
        specialty: "Pediatric Gastroenterologist",
        experienceYears: 28,
        rating: 4.9,
        reviewCount: 1100,
        consultationFee: 1500,
        isAvailableToday: true,
        availableSlots: ["10:30 AM", "01:30 PM", "04:30 PM"]
      },
      {
        name: "Dr. Raju Vaishya",
        isVerified: true,
        specialty: "Orthopedic",
        experienceYears: 35,
        rating: 4.8,
        reviewCount: 1300,
        consultationFee: 1500,
        isAvailableToday: true,
        availableSlots: ["09:00 AM", "12:00 PM"]
      },
      {
        name: "Dr. Vinit Suri",
        isVerified: true,
        specialty: "Neurologist",
        experienceYears: 30,
        rating: 4.8,
        reviewCount: 920,
        consultationFee: 1500,
        isAvailableToday: false,
        availableSlots: []
      },
      {
        name: "Dr. Muthu Jothi",
        isVerified: true,
        specialty: "Pediatric Cardiothoracic Surgeon",
        experienceYears: 25,
        rating: 4.7,
        reviewCount: 750,
        consultationFee: 1500,
        isAvailableToday: true,
        availableSlots: ["11:00 AM", "03:00 PM", "05:00 PM"]
      },
      {
        name: "Dr. Anita Gupta",
        isVerified: true,
        specialty: "Gynecologist",
        experienceYears: 22,
        rating: 4.6,
        reviewCount: 680,
        consultationFee: 1200,
        isAvailableToday: true,
        availableSlots: ["09:30 AM", "01:00 PM", "04:00 PM"]
      }
    ]
  },
  {
    name: "Max Super Speciality Hospital",
    brief: [
      "Leading network hospital in Saket.",
      "Specialized institutes for Cancer and Heart care.",
      "Advanced CyberKnife technology."
    ],
    address: "Press Enclave Road, Saket, New Delhi",
    city: "Delhi",
    location: { lat: 28.5273, lng: 77.2104 },
    contactNumber: "+91 11 2651 5050",
    email: "info.saket@maxhealthcare.com",
    hospitalType: "Private",
    facilities: ["24/7 Emergency", "CyberKnife", "Cath Lab", "ICU", "Dialysis Center"],
    rating: 4.5,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. K.K. Talwar",
        isVerified: true,
        specialty: "Cardiologist",
        experienceYears: 40,
        rating: 4.9,
        reviewCount: 1800,
        consultationFee: 1500,
        isAvailableToday: true,
        availableSlots: ["10:00 AM", "01:00 PM", "03:00 PM"]
      },
      {
        name: "Dr. Harit Chaturvedi",
        isVerified: true,
        specialty: "Surgical Oncologist",
        experienceYears: 32,
        rating: 4.8,
        reviewCount: 1200,
        consultationFee: 1500,
        isAvailableToday: true,
        availableSlots: ["09:30 AM", "12:30 PM"]
      },
      {
        name: "Dr. Puneet Girdhar",
        isVerified: true,
        specialty: "Spine Surgeon",
        experienceYears: 20,
        rating: 4.7,
        reviewCount: 890,
        consultationFee: 1500,
        isAvailableToday: false,
        availableSlots: []
      },
      {
        name: "Dr. R.K. Mishra",
        isVerified: true,
        specialty: "Laparoscopic Surgeon",
        experienceYears: 25,
        rating: 4.6,
        reviewCount: 750,
        consultationFee: 1200,
        isAvailableToday: true,
        availableSlots: ["11:00 AM", "02:00 PM", "05:00 PM"]
      },
      {
        name: "Dr. Meena Agarwal",
        isVerified: true,
        specialty: "Gynecologist",
        experienceYears: 18,
        rating: 4.5,
        reviewCount: 520,
        consultationFee: 1000,
        isAvailableToday: true,
        availableSlots: ["10:30 AM", "01:30 PM", "04:30 PM"]
      }
    ]
  },
  {
    name: "Fortis Escorts Heart Institute",
    brief: [
      "Globally recognized for cardiac care.",
      "Dual-source CT scan and advanced cath labs.",
      "Pioneers in minimally invasive cardiac surgery."
    ],
    address: "Okhla Road, New Delhi",
    city: "Delhi",
    location: { lat: 28.5621, lng: 77.2764 },
    contactNumber: "+91 11 4713 5000",
    email: "contactus.escorts@fortishealthcare.com",
    hospitalType: "Private",
    facilities: ["24/7 Emergency", "Advanced Cath Lab", "Cardiac ICU", "Blood Bank", "Heart Transplant"],
    rating: 4.6,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Ashok Seth",
        isVerified: true,
        specialty: "Interventional Cardiologist",
        experienceYears: 38,
        rating: 4.9,
        reviewCount: 2200,
        consultationFee: 2000,
        isAvailableToday: true,
        availableSlots: ["10:00 AM", "01:00 PM"]
      },
      {
        name: "Dr. Aparna Jaswal",
        isVerified: true,
        specialty: "Electrophysiologist",
        experienceYears: 24,
        rating: 4.8,
        reviewCount: 890,
        consultationFee: 1500,
        isAvailableToday: true,
        availableSlots: ["09:00 AM", "12:00 PM", "04:00 PM"]
      },
      {
        name: "Dr. Z.S. Meharwal",
        isVerified: true,
        specialty: "Cardiothoracic Surgeon",
        experienceYears: 32,
        rating: 4.9,
        reviewCount: 1100,
        consultationFee: 1800,
        isAvailableToday: false,
        availableSlots: []
      },
      {
        name: "Dr. Peeyush Jain",
        isVerified: true,
        specialty: "Preventive Cardiologist",
        experienceYears: 28,
        rating: 4.7,
        reviewCount: 750,
        consultationFee: 1200,
        isAvailableToday: true,
        availableSlots: ["11:30 AM", "02:30 PM", "05:00 PM"]
      },
      {
        name: "Dr. Vishal Rastogi",
        isVerified: true,
        specialty: "Cardiologist",
        experienceYears: 20,
        rating: 4.6,
        reviewCount: 560,
        consultationFee: 1200,
        isAvailableToday: true,
        availableSlots: ["10:30 AM", "01:30 PM", "03:30 PM"]
      }
    ]
  },
  {
    name: "Sir Sunderlal Hospital (BHU)",
    brief: [
      "Largest tertiary care hospital in Purvanchal.",
      "Part of the prestigious Banaras Hindu University.",
      "Advanced super-specialty wings for neurology and cardiology."
    ],
    address: "BHU Campus, Varanasi",
    city: "Varanasi",
    location: { lat: 25.2677, lng: 82.9913 },
    contactNumber: "+91 542 236 8858",
    email: "ms.ssh@bhu.ac.in",
    hospitalType: "Government",
    facilities: ["24/7 Emergency", "ICU", "Ayurvedic Wing", "Trauma Center", "Blood Bank"],
    rating: 4.4,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Om Prakash",
        isVerified: true,
        specialty: "Cardiologist",
        experienceYears: 22,
        rating: 4.7,
        reviewCount: 450,
        consultationFee: 300,
        isAvailableToday: true,
        availableSlots: ["10:00 AM", "01:00 PM", "04:00 PM"]
      },
      {
        name: "Dr. R.N. Mishra",
        isVerified: true,
        specialty: "Neurologist",
        experienceYears: 25,
        rating: 4.8,
        reviewCount: 520,
        consultationFee: 300,
        isAvailableToday: true,
        availableSlots: ["09:00 AM", "12:00 PM", "03:00 PM"]
      },
      {
        name: "Dr. Kavita Singh",
        isVerified: true,
        specialty: "Gynecologist",
        experienceYears: 18,
        rating: 4.6,
        reviewCount: 380,
        consultationFee: 300,
        isAvailableToday: false,
        availableSlots: []
      },
      {
        name: "Dr. Sanjay Gupta",
        isVerified: true,
        specialty: "General Surgeon",
        experienceYears: 20,
        rating: 4.5,
        reviewCount: 310,
        consultationFee: 300,
        isAvailableToday: true,
        availableSlots: ["11:00 AM", "02:00 PM", "05:00 PM"]
      },
      {
        name: "Dr. Alok Nath",
        isVerified: true,
        specialty: "Orthopedic",
        experienceYears: 15,
        rating: 4.4,
        reviewCount: 290,
        consultationFee: 300,
        isAvailableToday: true,
        availableSlots: ["10:30 AM", "01:30 PM", "04:30 PM"]
      }
    ]
  },
  {
    name: "Apex Super Specialty Hospital",
    brief: [
      "Leading private healthcare provider in Varanasi.",
      "Advanced cancer care and radiotherapy.",
      "Renowned orthopedic and joint replacement center."
    ],
    address: "BLW Road, Hydil, Varanasi",
    city: "Varanasi",
    location: { lat: 25.2890, lng: 82.9720 },
    contactNumber: "+91 542 231 7136",
    email: "info@apexhospital.in",
    hospitalType: "Private",
    facilities: ["24/7 Emergency", "Linear Accelerator", "ICU", "Dialysis Center", "Modular OT"],
    rating: 4.3,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. S.K. Singh",
        isVerified: true,
        specialty: "Orthopedic",
        experienceYears: 24,
        rating: 4.8,
        reviewCount: 650,
        consultationFee: 700,
        isAvailableToday: true,
        availableSlots: ["10:00 AM", "01:00 PM", "05:00 PM"]
      },
      {
        name: "Dr. Neha Rai",
        isVerified: true,
        specialty: "Oncologist",
        experienceYears: 14,
        rating: 4.6,
        reviewCount: 320,
        consultationFee: 800,
        isAvailableToday: true,
        availableSlots: ["09:30 AM", "12:30 PM", "03:30 PM"]
      },
      {
        name: "Dr. Amit Pandey",
        isVerified: true,
        specialty: "Cardiologist",
        experienceYears: 16,
        rating: 4.5,
        reviewCount: 290,
        consultationFee: 700,
        isAvailableToday: false,
        availableSlots: []
      },
      {
        name: "Dr. Shweta Singh",
        isVerified: true,
        specialty: "Gynecologist",
        experienceYears: 12,
        rating: 4.4,
        reviewCount: 210,
        consultationFee: 600,
        isAvailableToday: true,
        availableSlots: ["11:00 AM", "02:00 PM", "04:30 PM"]
      },
      {
        name: "Dr. Rahul Dubey",
        isVerified: true,
        specialty: "Neurologist",
        experienceYears: 15,
        rating: 4.7,
        reviewCount: 380,
        consultationFee: 700,
        isAvailableToday: true,
        availableSlots: ["10:30 AM", "01:30 PM", "06:00 PM"]
      }
    ]
  },
  {
    name: "Heritage Hospitals",
    brief: [
      "Varanasi's first NABH & NABL accredited hospital.",
      "Multidisciplinary corporate healthcare facility.",
      "Expertise in gastroenterology and minimally invasive surgery."
    ],
    address: "Lanka, Varanasi",
    city: "Varanasi",
    location: { lat: 25.2798, lng: 82.9987 },
    contactNumber: "+91 542 718 1911",
    email: "contact@heritagehospitals.com",
    hospitalType: "Private",
    facilities: ["24/7 Emergency", "NICU", "Endoscopy Center", "Blood Bank", "ICU"],
    rating: 4.5,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. D.P. Singh",
        isVerified: true,
        specialty: "Gastroenterologist",
        experienceYears: 20,
        rating: 4.8,
        reviewCount: 590,
        consultationFee: 700,
        isAvailableToday: true,
        availableSlots: ["09:00 AM", "12:00 PM", "04:00 PM"]
      },
      {
        name: "Dr. Kiran Singh",
        isVerified: true,
        specialty: "Gynecologist",
        experienceYears: 18,
        rating: 4.7,
        reviewCount: 420,
        consultationFee: 600,
        isAvailableToday: true,
        availableSlots: ["10:30 AM", "01:30 PM", "03:30 PM"]
      },
      {
        name: "Dr. Vivek Kumar",
        isVerified: true,
        specialty: "Laparoscopic Surgeon",
        experienceYears: 15,
        rating: 4.6,
        reviewCount: 350,
        consultationFee: 700,
        isAvailableToday: true,
        availableSlots: ["11:00 AM", "02:30 PM", "05:00 PM"]
      },
      {
        name: "Dr. Arvind Srivastava",
        isVerified: true,
        specialty: "Orthopedic",
        experienceYears: 22,
        rating: 4.5,
        reviewCount: 290,
        consultationFee: 700,
        isAvailableToday: false,
        availableSlots: []
      },
      {
        name: "Dr. Richa Pandey",
        isVerified: true,
        specialty: "Pediatrician",
        experienceYears: 10,
        rating: 4.4,
        reviewCount: 180,
        consultationFee: 500,
        isAvailableToday: true,
        availableSlots: ["09:30 AM", "12:30 PM", "04:30 PM"]
      }
    ]
  },
  {
    name: "Galaxy Hospital",
    brief: [
      "Premier center for neurosciences and trauma.",
      "Advanced MRI and CT scanning capabilities.",
      "24/7 specialized critical care teams."
    ],
    address: "Mahmoorganj, Varanasi",
    city: "Varanasi",
    location: { lat: 25.3050, lng: 82.9850 },
    contactNumber: "+91 542 222 2222",
    email: "info@galaxyhospital.com",
    hospitalType: "Private",
    facilities: ["24/7 Emergency", "Neuro ICU", "Trauma Center", "Radiology", "Pharmacy"],
    rating: 4.2,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Anish Kumar",
        isVerified: true,
        specialty: "Neurosurgeon",
        experienceYears: 18,
        rating: 4.8,
        reviewCount: 410,
        consultationFee: 800,
        isAvailableToday: true,
        availableSlots: ["10:00 AM", "01:00 PM", "05:00 PM"]
      },
      {
        name: "Dr. Manoj Yadav",
        isVerified: true,
        specialty: "Orthopedic",
        experienceYears: 16,
        rating: 4.5,
        reviewCount: 320,
        consultationFee: 600,
        isAvailableToday: true,
        availableSlots: ["09:00 AM", "12:00 PM", "04:00 PM"]
      },
      {
        name: "Dr. Sneha Jaiswal",
        isVerified: true,
        specialty: "Gynecologist",
        experienceYears: 12,
        rating: 4.6,
        reviewCount: 250,
        consultationFee: 600,
        isAvailableToday: false,
        availableSlots: []
      },
      {
        name: "Dr. Rohit Gupta",
        isVerified: true,
        specialty: "Physician",
        experienceYears: 14,
        rating: 4.4,
        reviewCount: 190,
        consultationFee: 500,
        isAvailableToday: true,
        availableSlots: ["11:00 AM", "02:00 PM", "06:00 PM"]
      },
      {
        name: "Dr. Anjali Singh",
        isVerified: true,
        specialty: "Dermatologist",
        experienceYears: 9,
        rating: 4.3,
        reviewCount: 150,
        consultationFee: 500,
        isAvailableToday: true,
        availableSlots: ["10:30 AM", "01:30 PM", "03:30 PM"]
      }
    ]
  },
  {
    name: "Surya Super Speciality Hospital",
    brief: [
      "Focus on maternal, child health, and general surgery.",
      "Modern infrastructure with high patient safety standards.",
      "Affordable multi-specialty care in the heart of Varanasi."
    ],
    address: "Durgakund Road, Varanasi",
    city: "Varanasi",
    location: { lat: 25.2910, lng: 82.9945 },
    contactNumber: "+91 542 231 1111",
    email: "contact@suryahospitalvns.com",
    hospitalType: "Private",
    facilities: ["24/7 Emergency", "NICU", "Modular OT", "Maternity Wing", "Diagnostics"],
    rating: 4.1,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Surya Prakash",
        isVerified: true,
        specialty: "General Surgeon",
        experienceYears: 20,
        rating: 4.7,
        reviewCount: 380,
        consultationFee: 600,
        isAvailableToday: true,
        availableSlots: ["09:30 AM", "12:30 PM", "04:30 PM"]
      },
      {
        name: "Dr. Renu Sharma",
        isVerified: true,
        specialty: "Pediatrician",
        experienceYears: 15,
        rating: 4.6,
        reviewCount: 420,
        consultationFee: 500,
        isAvailableToday: true,
        availableSlots: ["10:00 AM", "01:00 PM", "05:00 PM"]
      },
      {
        name: "Dr. Vikas Tiwari",
        isVerified: true,
        specialty: "Cardiologist",
        experienceYears: 12,
        rating: 4.4,
        reviewCount: 220,
        consultationFee: 700,
        isAvailableToday: false,
        availableSlots: []
      },
      {
        name: "Dr. Meena Singh",
        isVerified: true,
        specialty: "Gynecologist",
        experienceYears: 18,
        rating: 4.8,
        reviewCount: 510,
        consultationFee: 600,
        isAvailableToday: true,
        availableSlots: ["11:00 AM", "02:00 PM", "04:00 PM"]
      },
      {
        name: "Dr. Ashutosh Dubey",
        isVerified: true,
        specialty: "Urologist",
        experienceYears: 14,
        rating: 4.5,
        reviewCount: 190,
        consultationFee: 700,
        isAvailableToday: true,
        availableSlots: ["10:30 AM", "01:30 PM", "06:00 PM"]
      }
    ]
  }
];

module.exports = hospitals;