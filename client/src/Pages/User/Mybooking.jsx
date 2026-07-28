import React, { useEffect } from 'react';
import {
  Box, Typography, Paper, Chip, CircularProgress,
  Container, Divider, Button
} from '@mui/material';
import { useOrders } from '../../Context/OrderContext.jsx';
import { useAuth } from '../../Context/AuthContext.jsx';
import NavbarUser from '../../Components/NavUserAdmin/Navuser.jsx';
import Footer from '../../Components/Footer/Footer.jsx'; // ✅ تأكد من اسم الملف الصحيح
import { useNavigate } from 'react-router-dom';

const Mybooking = () => {
  const { orders, loading, getMyOrders } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getMyOrders();
    }
  }, [user]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted': return 'success';
      case 'rejected': return 'error';
      default: return 'warning';
    }
  };

  const getStatusLabel = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted': return '✅ مقبول';
      case 'rejected': return '❌ مرفوض';
      default: return '⏳ قيد الانتظار';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#1c1b18' }}>
        <CircularProgress sx={{ color: '#d4a843' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#1c1b18', display: 'flex', flexDirection: 'column' }}>
      <NavbarUser />
      <Container maxWidth="lg" sx={{ flex: 1, py: 8, mt: 10, mb: 10 }}>
        <Typography variant="h4" sx={{ color: '#f4f1ea', fontWeight: 700, mb: 4, textAlign: 'center' }}>
          📋 حجوزاتي
        </Typography>
        {orders.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 4 }}>
            <Typography sx={{ color: '#d6d1c4' }}>لا توجد طلبات حتى الآن.</Typography>
            <Button variant="contained" sx={{ mt: 2, bgcolor: '#d4a843' }} onClick={() => navigate('/shop')}>
              تسوق الآن
            </Button>
          </Paper>
        ) : (
          orders.map((order) => (
            <Paper key={order.id} sx={{ p: 3, mb: 3, bgcolor: 'rgba(255,255,255,0.07)', borderRadius: 3, border: '1px solid rgba(255,255,255,0.1)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                <Box>
                  <Typography sx={{ color: '#f4f1ea', fontWeight: 600 }}>طلب رقم #{order.id}</Typography>
                  <Typography sx={{ color: '#d6d1c4', fontSize: '0.85rem' }}>
                    {new Date(order.created_at).toLocaleDateString('ar-EG')}
                  </Typography>
                </Box>
                <Chip
                  label={getStatusLabel(order.status)}
                  color={getStatusColor(order.status)}
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              </Box>
              <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />
              <Typography sx={{ color: '#d6d1c4' }}><strong>المبلغ:</strong> ${Number(order.total_price).toFixed(2)}</Typography>
              <Typography sx={{ color: '#d6d1c4' }}><strong>العنوان:</strong> {order.address || 'غير محدد'}</Typography>
              {order.admin_message && (
                <Typography sx={{ color: '#ff6b6b', mt: 1 }}>
                  <strong>سبب الرفض:</strong> {order.admin_message}
                </Typography>
              )}
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ color: '#d6d1c4', fontSize: '0.8rem' }}>المنتجات:</Typography>
                {order.items?.map((item, idx) => (
                  <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', color: '#d6d1c4', fontSize: '0.85rem' }}>
                    <span>{item.name} × {item.quantity}</span>
                    <span>${(Number(item.price) * item.quantity).toFixed(2)}</span>
                  </Box>
                ))}
              </Box>
            </Paper>
          ))
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default Mybooking;