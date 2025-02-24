from rest_framework import renderers
import csv
import io
from apps.vehicles.models import Vehicle
from apps.service_booklets.models import ServiceBooklet


class VehicleServiceRenderer(renderers.BaseRenderer):
    media_type = 'text/csv'
    format = 'csv'

    def render(self, data, accepted_media_type=None, renderer_context=None):
        if isinstance(data, dict) and 'error' in data:
            return data['error']

        vehicle_fields = [field.name for field in Vehicle._meta.fields if field.name != "user"]
        booklets_fields = [field.name for field in ServiceBooklet._meta.fields if field.name not in["id", "vehicle"]]

        output = io.StringIO()
        headers = vehicle_fields
        booklets_headers = booklets_fields

        writer = csv.DictWriter(output, fieldnames=headers + booklets_headers)
        writer.writeheader()

        base_row = {field: data.get(field, '') for field in vehicle_fields}

        booklets = data.get('booklets', [])
        if booklets:
            for booklet in booklets:
                row = base_row.copy()
                row.update({
                    field: booklet.get(field, '') for field in booklets_fields
                })
                writer.writerow(row)
        else:
            writer.writerow(base_row)

        return output.getvalue()
