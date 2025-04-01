import fakeApi from '../js/fake-api';

const api = {
  getAllIncidents: async () =>
  {
    try
    {
      // Get all locations
      const locations = await fakeApi.getLocations();

      // Create mapping for location IDs to names
      const locationMap = locations.reduce((map, location) =>
      {
        map[location.id] = location.name;
        return map;
      }, {});

      // Fetch incidents for all locations
      const incidentsPromises = locations.map(location =>
        fakeApi.getIncidentsByLocationId(location.id)
      );

      const incidentsByLocation = await Promise.all(incidentsPromises);

      // Add location names and flatten
      const allIncidents = incidentsByLocation.flat().map(incident => ({
        ...incident,
        locationName: locationMap[incident.locationId] || 'Unknown Location'
      }));

      // Remove duplicates based on ID
      const uniqueIncidents = Array.from(
        new Map(allIncidents.map(incident => [incident.id, incident])).values()
      );

      // Sort by priority ascending, then datetime descending
      return uniqueIncidents.sort((a, b) =>
      {
        if (a.priority !== b.priority)
        {
          return a.priority - b.priority;
        }
        return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
      });
    } catch (error)
    {
      console.error('Error fetching incidents:', error);
      throw error;
    }
  }
};

export default api;
