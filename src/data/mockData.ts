export interface Child {
  id: string;
  name: string;
  age: number;
  phone: string;
  guardianName: string;
  guardianPhone: string;
  homeAddress: string;
  trackingId: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    timestamp: Date;
  };
  isInSafeZone: boolean;
}

export interface SafeZone {
  id: string;
  name: string;
  center: { lat: number; lng: number };
  radius: number;
  color: string;
}

export interface Alert {
  id: string;
  childId: string;
  childName: string;
  type: 'safe_zone_exit' | 'safe_zone_enter' | 'emergency' | 'low_battery';
  message: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
  status: 'active' | 'resolved';
}

export interface LocationHistory {
  id: string;
  childId: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  timestamp: Date;
  activity: string;
}

// Mock Children Data
export const mockChildren: Child[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    age: 8,
    phone: '+1-555-0123',
    guardianName: 'Sarah Johnson',
    guardianPhone: '+1-555-0100',
    homeAddress: '123 Oak Street, Springfield, IL 62701',
    trackingId: 'ST-2024-001',
    location: {
      lat: 39.7817,
      lng: -89.6501,
      address: 'Lincoln Elementary School, Springfield, IL',
      timestamp: new Date(Date.now() - 5 * 60 * 1000) // 5 minutes ago
    },
    isInSafeZone: true
  },
  {
    id: '2',
    name: 'Lucas Chen',
    age: 12,
    phone: '+1-555-0124',
    guardianName: 'Mike Chen',
    guardianPhone: '+1-555-0101',
    homeAddress: '456 Maple Ave, Springfield, IL 62702',
    trackingId: 'ST-2024-002',
    location: {
      lat: 39.7901,
      lng: -89.6437,
      address: 'Washington Park, Springfield, IL',
      timestamp: new Date(Date.now() - 12 * 60 * 1000) // 12 minutes ago
    },
    isInSafeZone: false
  },
  {
    id: '3',
    name: 'Sophia Williams',
    age: 10,
    phone: '+1-555-0125',
    guardianName: 'Jennifer Williams',
    guardianPhone: '+1-555-0102',
    homeAddress: '789 Pine Road, Springfield, IL 62703',
    trackingId: 'ST-2024-003',
    location: {
      lat: 39.7989,
      lng: -89.6401,
      address: 'Springfield Public Library, Springfield, IL',
      timestamp: new Date(Date.now() - 8 * 60 * 1000) // 8 minutes ago
    },
    isInSafeZone: true
  }
];

// Mock Safe Zones Data
export const mockSafeZones: SafeZone[] = [
  {
    id: '1',
    name: 'Home Area',
    center: { lat: 39.7800, lng: -89.6500 },
    radius: 200,
    color: '#10B981'
  },
  {
    id: '2',
    name: 'School Zone',
    center: { lat: 39.7817, lng: -89.6501 },
    radius: 150,
    color: '#3B82F6'
  },
  {
    id: '3',
    name: 'Library Safe Zone',
    center: { lat: 39.7989, lng: -89.6401 },
    radius: 100,
    color: '#8B5CF6'
  },
  {
    id: '4',
    name: 'Community Center',
    center: { lat: 39.7950, lng: -89.6450 },
    radius: 120,
    color: '#F59E0B'
  }
];

// Mock Alerts Data
export const mockAlerts: Alert[] = [
  {
    id: '1',
    childId: '2',
    childName: 'Lucas Chen',
    type: 'safe_zone_exit',
    message: 'Lucas has left the School Zone safe area',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    severity: 'medium',
    status: 'active'
  },
  {
    id: '2',
    childId: '1',
    childName: 'Emma Johnson',
    type: 'safe_zone_enter',
    message: 'Emma has entered the School Zone',
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    severity: 'low',
    status: 'resolved'
  },
  {
    id: '3',
    childId: '3',
    childName: 'Sophia Williams',
    type: 'emergency',
    message: 'Emergency button pressed by Sophia',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    severity: 'high',
    status: 'resolved'
  },
  {
    id: '4',
    childId: '2',
    childName: 'Lucas Chen',
    type: 'low_battery',
    message: 'Device battery low (15% remaining)',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    severity: 'low',
    status: 'active'
  }
];

// Mock Location History Data
export const mockLocationHistory: LocationHistory[] = [
  {
    id: '1',
    childId: '1',
    location: { lat: 39.7800, lng: -89.6500, address: 'Home - 123 Oak Street' },
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    activity: 'Left home'
  },
  {
    id: '2',
    childId: '1',
    location: { lat: 39.7817, lng: -89.6501, address: 'Lincoln Elementary School' },
    timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
    activity: 'Arrived at school'
  },
  {
    id: '3',
    childId: '2',
    location: { lat: 39.7850, lng: -89.6480, address: 'Washington Park' },
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    activity: 'Playing at park'
  },
  {
    id: '4',
    childId: '3',
    location: { lat: 39.7989, lng: -89.6401, address: 'Springfield Public Library' },
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    activity: 'Study session'
  }
];

// Notification Sound Function
export const playNotificationSound = (type: 'success' | 'warning' | 'error' = 'success') => {
  // Create audio context for notification sounds
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  const playTone = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  };

  switch (type) {
    case 'success':
      playTone(800, 0.15);
      setTimeout(() => playTone(1000, 0.15), 150);
      break;
    case 'warning':
      playTone(600, 0.2);
      setTimeout(() => playTone(600, 0.2), 250);
      break;
    case 'error':
      playTone(400, 0.3);
      setTimeout(() => playTone(300, 0.3), 200);
      setTimeout(() => playTone(200, 0.3), 400);
      break;
  }
};