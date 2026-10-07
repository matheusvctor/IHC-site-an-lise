export function formatCPF(value) {
  let v = value.replace(/\D/g, '');
  if (v.length > 11) v = v.slice(0, 11);
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return v;
}

export function formatTelefone(value) {
  let v = value.replace(/\D/g, '');
  if (v.length > 11) v = v.slice(0, 11);
  if (v.length > 10) {
    return v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  } else if (v.length > 6) {
    return v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
  } else if (v.length > 2) {
    return v.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
  }
  return v;
}

export function formatDateBR(dateStr) {
  if (!dateStr) return '-';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}

export function getPriorityBadgeColor(prioridade) {
  if (!prioridade) return 'badge-blue';
  if (prioridade.includes('Verde')) return 'badge-green';
  if (prioridade.includes('Azul')) return 'badge-blue';
  if (prioridade.includes('Amarelo')) return 'badge-yellow';
  if (prioridade.includes('Laranja') || prioridade.includes('Vermelho')) return 'badge-red';
  return 'badge-blue';
}
