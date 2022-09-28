import { format, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), "dd MMMM yyyy");
}
export function fDateTime2(date) {
  return format(new Date(date), "yyyy-MM-dd HH:mm");
}

export function fDateTime(date) {
  return format(new Date(date), "dd MMM yyyy HH:mm");
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), "dd/MM/yyyy hh:mm p");
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: fr,
  });
}
