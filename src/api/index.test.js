import api from './index';
import fakeApi from '../js/fake-api';

jest.mock('../js/fake-api');

describe('api.getAllIncidents', () =>
{
    afterEach(() =>
    {
        jest.clearAllMocks();
    });

    it('should fetch and process incidents correctly', async () =>
    {
        // Mock data
        const locations = [
            { id: 1, name: 'Location A' },
            { id: 2, name: 'Location B' }
        ];
        const incidentsLocation1 = [
            { id: 101, locationId: 1, priority: 2, datetime: '2023-01-01T10:00:00Z' },
            { id: 102, locationId: 1, priority: 1, datetime: '2023-01-02T10:00:00Z' }
        ];
        const incidentsLocation2 = [
            { id: 103, locationId: 2, priority: 3, datetime: '2023-01-01T12:00:00Z' }
        ];

        fakeApi.getLocations.mockResolvedValue(locations);
        fakeApi.getIncidentsByLocationId
            .mockResolvedValueOnce(incidentsLocation1)
            .mockResolvedValueOnce(incidentsLocation2);

        const result = await api.getAllIncidents();

        expect(fakeApi.getLocations).toHaveBeenCalledTimes(1);
        expect(fakeApi.getIncidentsByLocationId).toHaveBeenCalledTimes(2);
        expect(result).toEqual([
            { id: 102, locationId: 1, priority: 1, datetime: '2023-01-02T10:00:00Z', locationName: 'Location A' },
            { id: 101, locationId: 1, priority: 2, datetime: '2023-01-01T10:00:00Z', locationName: 'Location A' },
            { id: 103, locationId: 2, priority: 3, datetime: '2023-01-01T12:00:00Z', locationName: 'Location B' }
        ]);
    });

    it('should remove duplicate incidents based on ID', async () =>
    {
        const locations = [{ id: 1, name: 'Location A' }];
        const incidents = [
            { id: 101, locationId: 1, priority: 1, datetime: '2023-01-01T10:00:00Z' },
            { id: 101, locationId: 1, priority: 1, datetime: '2023-01-01T10:00:00Z' } // Duplicate
        ];

        fakeApi.getLocations.mockResolvedValue(locations);
        fakeApi.getIncidentsByLocationId.mockResolvedValueOnce(incidents);

        const result = await api.getAllIncidents();

        expect(result).toEqual([
            { id: 101, locationId: 1, priority: 1, datetime: '2023-01-01T10:00:00Z', locationName: 'Location A' }
        ]);
    });

    it('should handle sorting by priority and datetime', async () =>
    {
        const locations = [{ id: 1, name: 'Location A' }];
        const incidents = [
            { id: 101, locationId: 1, priority: 2, datetime: '2023-01-01T10:00:00Z' },
            { id: 102, locationId: 1, priority: 1, datetime: '2023-01-02T10:00:00Z' },
            { id: 103, locationId: 1, priority: 1, datetime: '2023-01-01T12:00:00Z' }
        ];

        fakeApi.getLocations.mockResolvedValue(locations);
        fakeApi.getIncidentsByLocationId.mockResolvedValueOnce(incidents);

        const result = await api.getAllIncidents();

        expect(result).toEqual([
            { id: 103, locationId: 1, priority: 1, datetime: '2023-01-01T12:00:00Z', locationName: 'Location A' },
            { id: 102, locationId: 1, priority: 1, datetime: '2023-01-02T10:00:00Z', locationName: 'Location A' },
            { id: 101, locationId: 1, priority: 2, datetime: '2023-01-01T10:00:00Z', locationName: 'Location A' }
        ]);
    });

    it('should throw an error if fetching locations fails', async () =>
    {
        fakeApi.getLocations.mockRejectedValue(new Error('Failed to fetch locations'));

        await expect(api.getAllIncidents()).rejects.toThrow('Failed to fetch locations');
        expect(fakeApi.getLocations).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if fetching incidents fails', async () =>
    {
        const locations = [{ id: 1, name: 'Location A' }];

        fakeApi.getLocations.mockResolvedValue(locations);
        fakeApi.getIncidentsByLocationId.mockRejectedValue(new Error('Failed to fetch incidents'));

        await expect(api.getAllIncidents()).rejects.toThrow('Failed to fetch incidents');
        expect(fakeApi.getLocations).toHaveBeenCalledTimes(1);
        expect(fakeApi.getIncidentsByLocationId).toHaveBeenCalledTimes(1);
    });
});