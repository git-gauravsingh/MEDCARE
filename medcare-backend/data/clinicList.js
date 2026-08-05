const clinics = [
  // --- DENTAL CLINICS ---
  {
    name: "Smile Care Dental Clinic",
    category: "Dental",
    brief: ["Advanced root canal treatments.", "Painless tooth extraction."],
    about: "Smile Care Dental Clinic provides top-notch dental treatments using the latest technology in a highly sterile environment. We focus on cosmetic dentistry and restorative procedures.",
    address: "Boring Road Chauraha, Patna",
    city: "Patna",
    distance: "1.2 km away",
    location: { lat: 25.6111, lng: 85.1165 },
    contactNumber: "+91 612 211 4455",
    email: "info@smilecarepatna.com",
    openingHours: "09:00 AM - 08:00 PM",
    isOpenNow: true,
    facilities: ["Parking", "Air Conditioned", "WiFi"],
    rating: 4.8,
    reviewCount: 245,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Ananya Sharma",
        isVerified: true,
        specialty: "Orthodontist",
        experienceYears: 12,
        rating: 4.9,
        reviewCount: 150,
        consultationFee: 500,
        isAvailableToday: true,
        availableSlots: ["10:00 AM", "01:30 PM", "05:00 PM"]
      },
      {
        name: "Dr. Rohan Gupta",
        isVerified: true,
        specialty: "Endodontist",
        experienceYears: 8,
        rating: 4.7,
        reviewCount: 95,
        consultationFee: 400,
        isAvailableToday: true,
        availableSlots: ["11:00 AM", "02:00 PM", "06:30 PM"]
      }
    ]
  },
  {
    name: "White Pearl Dental Care",
    category: "Dental",
    brief: ["Expert in dental implants.", "Laser teeth whitening."],
    about: "A multi-specialty dental center offering comprehensive oral care. Equipped with advanced digital X-rays and specialized implantology tools for premium care.",
    address: "Rajendra Nagar, Road No. 3, Patna",
    city: "Patna",
    distance: "3.5 km away",
    location: { lat: 25.6022, lng: 85.1501 },
    contactNumber: "+91 612 212 3344",
    email: "contact@whitepearldental.in",
    openingHours: "10:00 AM - 07:00 PM",
    isOpenNow: true,
    facilities: ["Wheelchair Accessible", "Parking", "Card Payment"],
    rating: 4.6,
    reviewCount: 180,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Sameer Verma",
        isVerified: true,
        specialty: "Prosthodontist",
        experienceYears: 15,
        rating: 4.8,
        reviewCount: 110,
        consultationFee: 600,
        isAvailableToday: false,
        availableSlots: []
      },
      {
        name: "Dr. Kavita Singh",
        isVerified: true,
        specialty: "General Dentist",
        experienceYears: 6,
        rating: 4.5,
        reviewCount: 70,
        consultationFee: 300,
        isAvailableToday: true,
        availableSlots: ["10:30 AM", "01:00 PM", "04:30 PM"]
      }
    ]
  },
  {
    name: "Perfect 32 Dental Clinic",
    category: "Dental",
    brief: ["Kids dentistry specialists.", "Affordable braces and aligners."],
    about: "Dedicated to providing family-friendly dental care with a special focus on pediatric dentistry. Strict hygiene protocols and painless treatment methodologies are our priority.",
    address: "Kankarbagh Main Road, Near Auto Stand, Patna",
    city: "Patna",
    distance: "4.1 km away",
    location: { lat: 25.5985, lng: 85.1480 },
    contactNumber: "+91 612 334 5566",
    email: "hello@perfect32patna.com",
    openingHours: "09:30 AM - 08:30 PM",
    isOpenNow: true,
    facilities: ["Kids Play Area", "Air Conditioned", "Parking"],
    rating: 4.7,
    reviewCount: 310,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Neha Jha",
        isVerified: true,
        specialty: "Pediatric Dentist",
        experienceYears: 10,
        rating: 4.9,
        reviewCount: 200,
        consultationFee: 500,
        isAvailableToday: true,
        availableSlots: ["09:30 AM", "12:30 PM", "05:30 PM"]
      },
      {
        name: "Dr. Amit Chaudhary",
        isVerified: true,
        specialty: "Orthodontist",
        experienceYears: 14,
        rating: 4.6,
        reviewCount: 110,
        consultationFee: 600,
        isAvailableToday: true,
        availableSlots: ["11:00 AM", "04:00 PM"]
      }
    ]
  },
  {
    name: "Shri Sai Dental & Maxillofacial Centre",
    category: "Dental",
    brief: ["Maxillofacial surgery.", "Pyorrhea and gum disease treatment."],
    about: "We specialize in complex surgical extractions, jaw surgeries, and advanced periodontics. Managed by highly experienced oral surgeons.",
    address: "Bailey Road, Saguna More, Patna",
    city: "Patna",
    distance: "7.8 km away",
    location: { lat: 25.6080, lng: 85.0450 },
    contactNumber: "+91 612 445 6677",
    email: "care@saidentalpatna.com",
    openingHours: "10:00 AM - 09:00 PM",
    isOpenNow: true,
    facilities: ["Surgical OT", "Parking", "Pharmacy"],
    rating: 4.5,
    reviewCount: 156,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Vikas Ranjan",
        isVerified: true,
        specialty: "Oral & Maxillofacial Surgeon",
        experienceYears: 18,
        rating: 4.8,
        reviewCount: 95,
        consultationFee: 800,
        isAvailableToday: true,
        availableSlots: ["10:30 AM", "01:30 PM", "06:00 PM"]
      },
      {
        name: "Dr. Priya Das",
        isVerified: true,
        specialty: "Periodontist",
        experienceYears: 9,
        rating: 4.4,
        reviewCount: 61,
        consultationFee: 400,
        isAvailableToday: true,
        availableSlots: ["11:30 AM", "03:00 PM"]
      }
    ]
  },
  {
    name: "Patliputra Dental Care",
    category: "Dental",
    brief: ["Routine dental checkups.", "Ceramic crowns and bridges."],
    about: "A premium dental clinic situated in the heart of Patliputra colony. We offer personalized cosmetic makeovers and routine restorative care.",
    address: "Patliputra Colony, Near Ruban Hospital, Patna",
    city: "Patna",
    distance: "2.5 km away",
    location: { lat: 25.6265, lng: 85.1055 },
    contactNumber: "+91 612 556 7788",
    email: "appointments@patliputradental.in",
    openingHours: "09:00 AM - 07:30 PM",
    isOpenNow: true,
    facilities: ["WiFi", "Accessible", "Waiting Lounge"],
    rating: 4.9,
    reviewCount: 420,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Rajeev Sinha",
        isVerified: true,
        specialty: "Cosmetic Dentist",
        experienceYears: 20,
        rating: 4.9,
        reviewCount: 280,
        consultationFee: 700,
        isAvailableToday: true,
        availableSlots: ["09:00 AM", "12:00 PM", "04:30 PM"]
      },
      {
        name: "Dr. Megha Singh",
        isVerified: true,
        specialty: "Endodontist",
        experienceYears: 7,
        rating: 4.6,
        reviewCount: 140,
        consultationFee: 500,
        isAvailableToday: false,
        availableSlots: []
      },
      {
        name: "Dr. Suresh Kumar",
        isVerified: true,
        specialty: "Orthodontist",
        experienceYears: 11,
        rating: 4.7,
        reviewCount: 90,
        consultationFee: 600,
        isAvailableToday: true,
        availableSlots: ["10:00 AM", "02:00 PM"]
      }
    ]
  },

  // --- EYE CLINICS ---
  {
    name: "Drishti Eye Care",
    category: "Eye",
    brief: ["Advanced cataract surgery.", "Computerized eye testing."],
    about: "Drishti Eye Care is a state-of-the-art vision center providing advanced phacoemulsification (cataract surgery), LASIK screening, and comprehensive eye exams.",
    address: "Exhibition Road, Patna",
    city: "Patna",
    distance: "1.8 km away",
    location: { lat: 25.6095, lng: 85.1415 },
    contactNumber: "+91 612 222 1122",
    email: "contact@drishtieyecare.com",
    openingHours: "10:00 AM - 08:00 PM",
    isOpenNow: true,
    facilities: ["Optical Store", "Parking", "Air Conditioned"],
    rating: 4.8,
    reviewCount: 512,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. R.K. Pandey",
        isVerified: true,
        specialty: "Ophthalmologist",
        experienceYears: 22,
        rating: 4.9,
        reviewCount: 320,
        consultationFee: 600,
        isAvailableToday: true,
        availableSlots: ["10:30 AM", "01:00 PM", "05:00 PM"]
      },
      {
        name: "Dr. Sneha Raj",
        isVerified: true,
        specialty: "Optometrist",
        experienceYears: 8,
        rating: 4.6,
        reviewCount: 192,
        consultationFee: 300,
        isAvailableToday: true,
        availableSlots: ["11:00 AM", "03:00 PM", "06:00 PM"]
      }
    ]
  },
  {
    name: "Vision Plus Eye Clinic",
    category: "Eye",
    brief: ["Glaucoma screening.", "Pediatric ophthalmology."],
    about: "A premier eye care facility dedicated to protecting and enhancing vision. Equipped with modern diagnostic machines for retinal imaging and glaucoma checks.",
    address: "Ashiana Digha Road, Patna",
    city: "Patna",
    distance: "5.4 km away",
    location: { lat: 25.6290, lng: 85.0780 },
    contactNumber: "+91 612 333 2211",
    email: "info@visionpluspatna.in",
    openingHours: "09:00 AM - 07:00 PM",
    isOpenNow: true,
    facilities: ["Accessible", "Pharmacy", "Optical Store"],
    rating: 4.5,
    reviewCount: 215,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Alok Verma",
        isVerified: true,
        specialty: "Ophthalmologist",
        experienceYears: 15,
        rating: 4.7,
        reviewCount: 150,
        consultationFee: 500,
        isAvailableToday: true,
        availableSlots: ["09:00 AM", "12:00 PM", "04:00 PM"]
      },
      {
        name: "Dr. Shruti Sinha",
        isVerified: true,
        specialty: "Pediatric Ophthalmologist",
        experienceYears: 10,
        rating: 4.8,
        reviewCount: 65,
        consultationFee: 600,
        isAvailableToday: false,
        availableSlots: []
      }
    ]
  },
  {
    name: "Netralaya Eye Hospital",
    category: "Eye",
    brief: ["Retina specialist.", "Laser vision correction counseling."],
    about: "Netralaya is a dedicated eye clinic specializing in diabetic retinopathy, macular degeneration, and complex retinal surgeries.",
    address: "Bhootnath Road, Patna",
    city: "Patna",
    distance: "6.2 km away",
    location: { lat: 25.5975, lng: 85.1760 },
    contactNumber: "+91 612 444 3322",
    email: "help@netralayapatna.com",
    openingHours: "10:00 AM - 06:00 PM",
    isOpenNow: true,
    facilities: ["Wheelchair Accessible", "WiFi", "Emergency Care"],
    rating: 4.6,
    reviewCount: 180,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. K.N. Sahay",
        isVerified: true,
        specialty: "Retina Surgeon",
        experienceYears: 25,
        rating: 4.9,
        reviewCount: 140,
        consultationFee: 800,
        isAvailableToday: true,
        availableSlots: ["10:30 AM", "01:30 PM", "03:30 PM"]
      },
      {
        name: "Dr. Priti Ranjan",
        isVerified: true,
        specialty: "Ophthalmologist",
        experienceYears: 12,
        rating: 4.5,
        reviewCount: 40,
        consultationFee: 500,
        isAvailableToday: true,
        availableSlots: ["11:00 AM", "02:00 PM"]
      }
    ]
  },
  {
    name: "ClearView Vision Centre",
    category: "Eye",
    brief: ["Contact lens clinic.", "Dry eye treatment."],
    about: "ClearView Vision Centre offers primary eye care, contact lens fitting, and advanced treatments for chronic dry eye conditions.",
    address: "Frazer Road, Dak Bungalow Chauraha, Patna",
    city: "Patna",
    distance: "0.8 km away",
    location: { lat: 25.6105, lng: 85.1375 },
    contactNumber: "+91 612 555 4433",
    email: "clearview@patnaeyes.in",
    openingHours: "09:30 AM - 08:30 PM",
    isOpenNow: true,
    facilities: ["Parking", "Card Payment", "Optical Store"],
    rating: 4.7,
    reviewCount: 390,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Manish Tiwari",
        isVerified: true,
        specialty: "Ophthalmologist",
        experienceYears: 14,
        rating: 4.8,
        reviewCount: 210,
        consultationFee: 600,
        isAvailableToday: true,
        availableSlots: ["09:30 AM", "12:30 PM", "05:00 PM"]
      },
      {
        name: "Dr. Ayesha Khan",
        isVerified: true,
        specialty: "Optometrist",
        experienceYears: 6,
        rating: 4.6,
        reviewCount: 180,
        consultationFee: 300,
        isAvailableToday: true,
        availableSlots: ["10:00 AM", "02:00 PM", "06:30 PM"]
      }
    ]
  },
  {
    name: "Surya Eye Care Clinic",
    category: "Eye",
    brief: ["Squint correction.", "Comprehensive eye checkups."],
    about: "Surya Eye Care offers a friendly and patient-centric approach to vision health. We specialize in non-surgical squint correction and general ophthalmology.",
    address: "Anisabad, Patna",
    city: "Patna",
    distance: "5.1 km away",
    location: { lat: 25.5780, lng: 85.0945 },
    contactNumber: "+91 612 666 5544",
    email: "appointments@suryaeyecare.com",
    openingHours: "10:00 AM - 07:00 PM",
    isOpenNow: true,
    facilities: ["Accessible", "Waiting Lounge"],
    rating: 4.4,
    reviewCount: 120,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Surya Prakash",
        isVerified: true,
        specialty: "Ophthalmologist",
        experienceYears: 18,
        rating: 4.7,
        reviewCount: 85,
        consultationFee: 500,
        isAvailableToday: true,
        availableSlots: ["10:00 AM", "01:00 PM", "04:30 PM"]
      },
      {
        name: "Dr. Neelesh Kumar",
        isVerified: true,
        specialty: "Ophthalmologist",
        experienceYears: 9,
        rating: 4.3,
        reviewCount: 35,
        consultationFee: 400,
        isAvailableToday: false,
        availableSlots: []
      },
      {
        name: "Dr. Swati Sharma",
        isVerified: true,
        specialty: "Optometrist",
        experienceYears: 5,
        rating: 4.5,
        reviewCount: 0,
        consultationFee: 200,
        isAvailableToday: true,
        availableSlots: ["11:30 AM", "03:30 PM"]
      }
    ]
  },

  // --- SKIN CLINICS ---
  {
    name: "Glow Skin & Laser Clinic",
    category: "Skin",
    brief: ["Laser hair removal.", "Acne and scar treatments."],
    about: "Glow Skin Clinic uses FDA-approved lasers and advanced dermatological treatments to give you healthy, glowing skin. Strict hygiene standards are maintained.",
    address: "Boring Canal Road, Patna",
    city: "Patna",
    distance: "1.5 km away",
    location: { lat: 25.6140, lng: 85.1180 },
    contactNumber: "+91 612 777 6655",
    email: "contact@glowskinpatna.com",
    openingHours: "11:00 AM - 08:00 PM",
    isOpenNow: true,
    facilities: ["Air Conditioned", "Card Payment", "WiFi"],
    rating: 4.8,
    reviewCount: 650,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Kavya Mishra",
        isVerified: true,
        specialty: "Dermatologist",
        experienceYears: 10,
        rating: 4.9,
        reviewCount: 400,
        consultationFee: 700,
        isAvailableToday: true,
        availableSlots: ["11:00 AM", "02:00 PM", "06:00 PM"]
      },
      {
        name: "Dr. Siddharth Jain",
        isVerified: true,
        specialty: "Cosmetologist",
        experienceYears: 8,
        rating: 4.6,
        reviewCount: 250,
        consultationFee: 600,
        isAvailableToday: true,
        availableSlots: ["12:00 PM", "04:00 PM", "07:30 PM"]
      }
    ]
  },
  {
    name: "DermaCare Center",
    category: "Skin",
    brief: ["Psoriasis & Eczema care.", "Hair fall therapies."],
    about: "DermaCare is a specialized medical dermatology clinic focusing on clinical skin conditions, allergies, and chronic hair loss treatments.",
    address: "Kankarbagh, Near Colony More, Patna",
    city: "Patna",
    distance: "3.8 km away",
    location: { lat: 25.5960, lng: 85.1465 },
    contactNumber: "+91 612 888 7766",
    email: "info@dermacarepatna.in",
    openingHours: "09:00 AM - 02:00 PM, 04:00 PM - 09:00 PM",
    isOpenNow: true,
    facilities: ["Pharmacy", "Parking", "Accessible"],
    rating: 4.7,
    reviewCount: 310,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. A.K. Jha",
        isVerified: true,
        specialty: "Dermatologist",
        experienceYears: 24,
        rating: 4.8,
        reviewCount: 210,
        consultationFee: 800,
        isAvailableToday: true,
        availableSlots: ["09:00 AM", "11:30 AM", "05:00 PM"]
      },
      {
        name: "Dr. Shalini Prasad",
        isVerified: true,
        specialty: "Trichologist",
        experienceYears: 11,
        rating: 4.5,
        reviewCount: 100,
        consultationFee: 600,
        isAvailableToday: false,
        availableSlots: []
      }
    ]
  },
  {
    name: "Radiance Skin & Hair Aesthetics",
    category: "Skin",
    brief: ["Anti-aging treatments.", "Chemical peels & Botox."],
    about: "A premium aesthetic clinic offering modern anti-aging solutions, dermal fillers, and customized skincare regimens in a luxurious setting.",
    address: "Patliputra Industrial Area, Patna",
    city: "Patna",
    distance: "4.5 km away",
    location: { lat: 25.6320, lng: 85.1010 },
    contactNumber: "+91 612 999 8877",
    email: "hello@radianceaesthetics.com",
    openingHours: "10:30 AM - 08:30 PM",
    isOpenNow: true,
    facilities: ["VIP Lounge", "WiFi", "Valet Parking"],
    rating: 4.9,
    reviewCount: 420,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Ritu Sharma",
        isVerified: true,
        specialty: "Aesthetic Dermatologist",
        experienceYears: 14,
        rating: 4.9,
        reviewCount: 290,
        consultationFee: 1000,
        isAvailableToday: true,
        availableSlots: ["11:00 AM", "03:00 PM", "06:00 PM"]
      },
      {
        name: "Dr. Vikram Singh",
        isVerified: true,
        specialty: "Dermatologist",
        experienceYears: 9,
        rating: 4.7,
        reviewCount: 130,
        consultationFee: 700,
        isAvailableToday: true,
        availableSlots: ["12:30 PM", "04:30 PM", "07:00 PM"]
      }
    ]
  },
  {
    name: "Patna Dermatology Centre",
    category: "Skin",
    brief: ["Clinical dermatology.", "Skin biopsies and mole removal."],
    about: "A trusted name in Patna for comprehensive clinical dermatology. We handle everything from pediatric skin issues to advanced dermatopathology.",
    address: "Rajendra Nagar, Near Stadium, Patna",
    city: "Patna",
    distance: "3.2 km away",
    location: { lat: 25.6045, lng: 85.1530 },
    contactNumber: "+91 612 111 2233",
    email: "care@patnadermatology.in",
    openingHours: "09:00 AM - 07:00 PM",
    isOpenNow: true,
    facilities: ["Minor OT", "Pharmacy", "Accessible"],
    rating: 4.5,
    reviewCount: 185,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. SK Chaudhary",
        isVerified: true,
        specialty: "Dermatologist",
        experienceYears: 30,
        rating: 4.8,
        reviewCount: 150,
        consultationFee: 800,
        isAvailableToday: true,
        availableSlots: ["09:00 AM", "12:00 PM"]
      },
      {
        name: "Dr. Prerna Anand",
        isVerified: true,
        specialty: "Dermatologist",
        experienceYears: 7,
        rating: 4.4,
        reviewCount: 35,
        consultationFee: 500,
        isAvailableToday: true,
        availableSlots: ["02:00 PM", "04:30 PM", "06:00 PM"]
      }
    ]
  },
  {
    name: "Skin & Laser Center",
    category: "Skin",
    brief: ["Tattoo removal.", "Vitiligo treatment."],
    about: "Equipped with state-of-the-art Q-Switched lasers for tattoo removal and pigmentation treatments. We also specialize in UV therapies for Vitiligo.",
    address: "Danapur Cantt Road, Patna",
    city: "Patna",
    distance: "8.5 km away",
    location: { lat: 25.6250, lng: 85.0500 },
    contactNumber: "+91 612 222 3344",
    email: "info@skinlaserpatna.com",
    openingHours: "10:00 AM - 08:00 PM",
    isOpenNow: true,
    facilities: ["Air Conditioned", "Parking", "WiFi"],
    rating: 4.6,
    reviewCount: 220,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Anirudh Prakash",
        isVerified: true,
        specialty: "Dermatologist",
        experienceYears: 16,
        rating: 4.7,
        reviewCount: 140,
        consultationFee: 600,
        isAvailableToday: true,
        availableSlots: ["10:30 AM", "01:30 PM", "05:00 PM"]
      },
      {
        name: "Dr. Zara Hussain",
        isVerified: true,
        specialty: "Cosmetologist",
        experienceYears: 5,
        rating: 4.5,
        reviewCount: 80,
        consultationFee: 400,
        isAvailableToday: false,
        availableSlots: []
      },
      {
        name: "Dr. Varun Tej",
        isVerified: true,
        specialty: "Dermatologist",
        experienceYears: 10,
        rating: 4.6,
        reviewCount: 0,
        consultationFee: 500,
        isAvailableToday: true,
        availableSlots: ["11:00 AM", "03:00 PM", "06:30 PM"]
      }
    ]
  },

  // --- GENERAL CLINICS ---
  {
    name: "Family Health Clinic",
    category: "General",
    brief: ["Routine checkups.", "Vaccination centre."],
    about: "Your neighborhood family clinic offering comprehensive primary care, pediatric immunizations, and chronic disease management like diabetes and hypertension.",
    address: "SK Puri, Near Children's Park, Patna",
    city: "Patna",
    distance: "2.0 km away",
    location: { lat: 25.6155, lng: 85.1220 },
    contactNumber: "+91 612 333 4455",
    email: "care@familyhealthpatna.com",
    openingHours: "08:00 AM - 09:00 PM",
    isOpenNow: true,
    facilities: ["ECG", "Lab Collection", "Accessible"],
    rating: 4.7,
    reviewCount: 410,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Ramesh Sinha",
        isVerified: true,
        specialty: "General Physician",
        experienceYears: 25,
        rating: 4.9,
        reviewCount: 250,
        consultationFee: 400,
        isAvailableToday: true,
        availableSlots: ["08:30 AM", "11:30 AM", "06:00 PM"]
      },
      {
        name: "Dr. Suman Roy",
        isVerified: true,
        specialty: "Family Medicine",
        experienceYears: 12,
        rating: 4.6,
        reviewCount: 160,
        consultationFee: 300,
        isAvailableToday: true,
        availableSlots: ["01:00 PM", "04:00 PM", "07:30 PM"]
      }
    ]
  },
  {
    name: "City Care Clinic",
    category: "General",
    brief: ["Fever and infections.", "Minor injuries & suturing."],
    about: "City Care Clinic acts as a primary urgent care facility, equipped to handle minor emergencies, seasonal fevers, and basic diagnostic tests.",
    address: "Bazar Samiti Road, Patna",
    city: "Patna",
    distance: "4.8 km away",
    location: { lat: 25.6005, lng: 85.1680 },
    contactNumber: "+91 612 444 5566",
    email: "helpdesk@citycarepatna.in",
    openingHours: "24 Hours",
    isOpenNow: true,
    facilities: ["24/7 Open", "Pharmacy", "Parking"],
    rating: 4.4,
    reviewCount: 305,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Alok Pandey",
        isVerified: true,
        specialty: "General Physician",
        experienceYears: 18,
        rating: 4.5,
        reviewCount: 200,
        consultationFee: 300,
        isAvailableToday: true,
        availableSlots: ["10:00 AM", "02:00 PM", "08:00 PM"]
      },
      {
        name: "Dr. Sweta Kiran",
        isVerified: true,
        specialty: "General Practitioner",
        experienceYears: 5,
        rating: 4.3,
        reviewCount: 105,
        consultationFee: 200,
        isAvailableToday: true,
        availableSlots: ["08:00 AM", "04:00 PM"]
      }
    ]
  },
  {
    name: "Jeevan Jyoti Health Centre",
    category: "General",
    brief: ["Diabetes management.", "Thyroid clinic."],
    about: "Specializing in the management of lifestyle diseases. We provide continuous monitoring, diet counseling, and primary medical care under one roof.",
    address: "Phulwari Sharif, Patna",
    city: "Patna",
    distance: "7.0 km away",
    location: { lat: 25.5670, lng: 85.0450 },
    contactNumber: "+91 612 555 6677",
    email: "info@jeevanjyotipatna.org",
    openingHours: "09:00 AM - 06:00 PM",
    isOpenNow: true,
    facilities: ["In-house Dietician", "Accessible", "WiFi"],
    rating: 4.6,
    reviewCount: 275,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. B.K. Singh",
        isVerified: true,
        specialty: "Internal Medicine",
        experienceYears: 22,
        rating: 4.8,
        reviewCount: 190,
        consultationFee: 500,
        isAvailableToday: false,
        availableSlots: []
      },
      {
        name: "Dr. Anita Raj",
        isVerified: true,
        specialty: "General Physician",
        experienceYears: 14,
        rating: 4.5,
        reviewCount: 85,
        consultationFee: 400,
        isAvailableToday: true,
        availableSlots: ["09:30 AM", "12:30 PM", "03:30 PM"]
      }
    ]
  },
  {
    name: "Aastha Primary Care",
    category: "General",
    brief: ["Geriatric care.", "Home visit available."],
    about: "Aastha Primary Care is dedicated to providing compassionate medical care for the elderly. We also offer basic health checkups for the whole family.",
    address: "Kadamkuan, Patna",
    city: "Patna",
    distance: "2.8 km away",
    location: { lat: 25.6135, lng: 85.1470 },
    contactNumber: "+91 612 666 7788",
    email: "contact@aasthacare.in",
    openingHours: "08:30 AM - 08:30 PM",
    isOpenNow: true,
    facilities: ["Wheelchair Accessible", "Home Collection", "Parking"],
    rating: 4.8,
    reviewCount: 150,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. OP Srivastava",
        isVerified: true,
        specialty: "General Physician",
        experienceYears: 32,
        rating: 4.9,
        reviewCount: 110,
        consultationFee: 500,
        isAvailableToday: true,
        availableSlots: ["09:00 AM", "01:00 PM"]
      },
      {
        name: "Dr. Nidhi Verma",
        isVerified: true,
        specialty: "Family Medicine",
        experienceYears: 9,
        rating: 4.6,
        reviewCount: 40,
        consultationFee: 300,
        isAvailableToday: true,
        availableSlots: ["10:30 AM", "04:30 PM", "07:00 PM"]
      }
    ]
  },
  {
    name: "Wellness General Clinic",
    category: "General",
    brief: ["Asthma and allergy care.", "Nebulization available."],
    about: "A modern clinic focusing on holistic wellness and prompt treatment of seasonal illnesses, allergic bronchitis, and gastrointestinal issues.",
    address: "Ashok Rajpath, Near NIT Patna",
    city: "Patna",
    distance: "4.5 km away",
    location: { lat: 25.6205, lng: 85.1720 },
    contactNumber: "+91 612 777 8899",
    email: "appointments@wellnesspatna.com",
    openingHours: "10:00 AM - 09:00 PM",
    isOpenNow: true,
    facilities: ["Pharmacy", "Air Conditioned", "Accessible"],
    rating: 4.5,
    reviewCount: 220,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Rakesh Kumar",
        isVerified: true,
        specialty: "General Physician",
        experienceYears: 15,
        rating: 4.7,
        reviewCount: 130,
        consultationFee: 400,
        isAvailableToday: true,
        availableSlots: ["10:30 AM", "02:00 PM", "06:30 PM"]
      },
      {
        name: "Dr. Manisha Jha",
        isVerified: true,
        specialty: "Internal Medicine",
        experienceYears: 11,
        rating: 4.4,
        reviewCount: 90,
        consultationFee: 400,
        isAvailableToday: true,
        availableSlots: ["11:30 AM", "04:00 PM", "08:00 PM"]
      },
      {
        name: "Dr. Varun Singh",
        isVerified: true,
        specialty: "General Practitioner",
        experienceYears: 6,
        rating: 4.5,
        reviewCount: 0,
        consultationFee: 250,
        isAvailableToday: false,
        availableSlots: []
      }
    ]
  },

  // --- PHYSIOTHERAPY CLINICS ---
  {
    name: "ActiveLife Physio Centre",
    category: "Physiotherapy",
    brief: ["Sports injury rehab.", "Post-surgical recovery."],
    about: "ActiveLife Physio provides evidence-based rehabilitation protocols. We have modern modalities like IFT, TENS, Ultrasound, and a dedicated exercise therapy gym.",
    address: "Shivpuri, Patna",
    city: "Patna",
    distance: "2.3 km away",
    location: { lat: 25.6190, lng: 85.1200 },
    contactNumber: "+91 612 123 4567",
    email: "info@activelifephysio.in",
    openingHours: "07:00 AM - 08:00 PM",
    isOpenNow: true,
    facilities: ["Rehab Gym", "Air Conditioned", "Accessible"],
    rating: 4.8,
    reviewCount: 310,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Ankit Raj",
        isVerified: true,
        specialty: "Sports Physiotherapist",
        experienceYears: 10,
        rating: 4.9,
        reviewCount: 180,
        consultationFee: 400,
        isAvailableToday: true,
        availableSlots: ["08:00 AM", "11:00 AM", "05:00 PM"]
      },
      {
        name: "Dr. Puja Kumari",
        isVerified: true,
        specialty: "Physiotherapist",
        experienceYears: 7,
        rating: 4.7,
        reviewCount: 130,
        consultationFee: 300,
        isAvailableToday: true,
        availableSlots: ["09:00 AM", "01:00 PM", "06:30 PM"]
      }
    ]
  },
  {
    name: "Mobility Physiotherapy Clinic",
    category: "Physiotherapy",
    brief: ["Back & neck pain relief.", "Ergonomic counseling."],
    about: "Specializes in musculoskeletal disorders, providing manual therapy, dry needling, and posture correction programs tailored to office workers and the elderly.",
    address: "Gola Road, Danapur, Patna",
    city: "Patna",
    distance: "7.5 km away",
    location: { lat: 25.6175, lng: 85.0610 },
    contactNumber: "+91 612 234 5678",
    email: "care@mobilityphysio.com",
    openingHours: "08:00 AM - 09:00 PM",
    isOpenNow: true,
    facilities: ["Parking", "WiFi", "Home Visit Available"],
    rating: 4.7,
    reviewCount: 240,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Rohan Das",
        isVerified: true,
        specialty: "Orthopedic Physiotherapist",
        experienceYears: 12,
        rating: 4.8,
        reviewCount: 150,
        consultationFee: 500,
        isAvailableToday: true,
        availableSlots: ["08:30 AM", "12:00 PM", "04:30 PM"]
      },
      {
        name: "Dr. Sneha Verma",
        isVerified: true,
        specialty: "Physiotherapist",
        experienceYears: 5,
        rating: 4.5,
        reviewCount: 90,
        consultationFee: 300,
        isAvailableToday: false,
        availableSlots: []
      }
    ]
  },
  {
    name: "Heal & Fit Physio Care",
    category: "Physiotherapy",
    brief: ["Neurological rehab.", "Paralysis recovery."],
    about: "Heal & Fit provides specialized neuro-rehabilitation for stroke patients, cerebral palsy, and spinal cord injuries. Compassionate and intensive therapy is our motto.",
    address: "Rajendra Nagar, Patna",
    city: "Patna",
    distance: "3.0 km away",
    location: { lat: 25.6030, lng: 85.1510 },
    contactNumber: "+91 612 345 6789",
    email: "hello@healfitphysio.in",
    openingHours: "09:00 AM - 07:00 PM",
    isOpenNow: true,
    facilities: ["Wheelchair Accessible", "Elevator", "Air Conditioned"],
    rating: 4.9,
    reviewCount: 185,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Vikas Sharma",
        isVerified: true,
        specialty: "Neuro Physiotherapist",
        experienceYears: 14,
        rating: 4.9,
        reviewCount: 110,
        consultationFee: 600,
        isAvailableToday: true,
        availableSlots: ["09:30 AM", "01:30 PM", "05:00 PM"]
      },
      {
        name: "Dr. Preeti Jain",
        isVerified: true,
        specialty: "Physiotherapist",
        experienceYears: 8,
        rating: 4.7,
        reviewCount: 75,
        consultationFee: 400,
        isAvailableToday: true,
        availableSlots: ["10:30 AM", "02:30 PM"]
      }
    ]
  },
  {
    name: "Patna Physiotherapy Centre",
    category: "Physiotherapy",
    brief: ["Joint pain management.", "Cervical spondylosis care."],
    about: "One of the oldest and most trusted physiotherapy centres in Patna. We use classical modalities and advanced kinetic control strategies for pain management.",
    address: "Kadamkuan, Nala Road, Patna",
    city: "Patna",
    distance: "2.7 km away",
    location: { lat: 25.6115, lng: 85.1485 },
    contactNumber: "+91 612 456 7890",
    email: "contact@patnaphysio.com",
    openingHours: "08:00 AM - 08:00 PM",
    isOpenNow: true,
    facilities: ["Parking", "Accessible", "Waiting Lounge"],
    rating: 4.6,
    reviewCount: 340,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. K.P. Singh",
        isVerified: true,
        specialty: "Senior Physiotherapist",
        experienceYears: 25,
        rating: 4.8,
        reviewCount: 220,
        consultationFee: 500,
        isAvailableToday: true,
        availableSlots: ["08:00 AM", "11:00 AM", "04:00 PM"]
      },
      {
        name: "Dr. Neha Anand",
        isVerified: true,
        specialty: "Physiotherapist",
        experienceYears: 9,
        rating: 4.5,
        reviewCount: 120,
        consultationFee: 300,
        isAvailableToday: true,
        availableSlots: ["09:30 AM", "02:00 PM", "06:00 PM"]
      },
      {
        name: "Dr. Amit Ranjan",
        isVerified: true,
        specialty: "Sports Physiotherapist",
        experienceYears: 6,
        rating: 4.4,
        reviewCount: 0,
        consultationFee: 350,
        isAvailableToday: true,
        availableSlots: ["10:30 AM", "03:30 PM", "07:30 PM"]
      }
    ]
  },
  {
    name: "Spine & Joint Care Physio",
    category: "Physiotherapy",
    brief: ["Chiropractic adjustments.", "Sciatica relief."],
    about: "A niche clinic specializing in spine health, slip disc management, and posture alignment. Incorporates modern chiropractic techniques alongside traditional physio.",
    address: "Bailey Road, RPS More, Patna",
    city: "Patna",
    distance: "6.8 km away",
    location: { lat: 25.6050, lng: 85.0510 },
    contactNumber: "+91 612 567 8901",
    email: "info@spinejointpatna.in",
    openingHours: "09:00 AM - 09:00 PM",
    isOpenNow: true,
    facilities: ["Advanced Modalities", "Air Conditioned", "Card Payment"],
    rating: 4.8,
    reviewCount: 290,
    isVerified: true,
    doctorsList: [
      {
        name: "Dr. Saurabh Mishra",
        isVerified: true,
        specialty: "Chiropractor & Physio",
        experienceYears: 16,
        rating: 4.9,
        reviewCount: 190,
        consultationFee: 700,
        isAvailableToday: true,
        availableSlots: ["09:00 AM", "12:30 PM", "05:00 PM"]
      },
      {
        name: "Dr. Aakriti Singh",
        isVerified: true,
        specialty: "Physiotherapist",
        experienceYears: 7,
        rating: 4.6,
        reviewCount: 100,
        consultationFee: 400,
        isAvailableToday: false,
        availableSlots: []
      }
    ]
  }
];

module.exports = clinics;