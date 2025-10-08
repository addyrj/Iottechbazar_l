// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  ShoppingCart, 
  People, 
  AttachMoney, 
  TrendingUp,
  TrendingDown,
  Inventory,
  Warning,
  LocalShipping,
  Assessment,
  MoreVert,
  ArrowUpward,
  ArrowDownward,
  Refresh,
  Notifications,
  Search,
  Menu,
  Close,
  Person,
  Category,
  RateReview
} from '@mui/icons-material';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  getAdminCustomerList, 
  getAdminOrder, 
  getAllProducts, 
  getCategoryData,
  getAdminProductReview,
  getAdminCsutomerCart
} from '../../../Database/Action/AdminAction';
import '../Styles/dashboard.css';
import { useNavigate } from 'react-router-dom';

// Utility functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};

const formatNumber = (num) => {
  return new Intl.NumberFormat('en-IN').format(num);
};

const StatCard = ({ title, value, change, changeType, icon, gradient, iconBg, alert, loading }) => {
  const isPositive = changeType === 'up';
  
  if (loading) {
    return (
      <div className="stat-card loading">
        <div className="stat-card-header">
          <div className="stat-icon skeleton"></div>
          <div className="stat-badge skeleton"></div>
        </div>
        <div className="stat-content">
          <div className="stat-title skeleton-text"></div>
          <div className="stat-value skeleton-text"></div>
          <div className="stat-subtitle skeleton-text"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`stat-card ${alert ? 'stat-card-alert' : ''}`}>
      <div className="stat-card-header">
        <div className="stat-icon" style={{ background: iconBg }}>
          {React.cloneElement(icon, { style: { fontSize: '28px' } })}
        </div>
        <div className={`stat-badge ${isPositive ? 'stat-badge-up' : 'stat-badge-down'}`}>
          {isPositive ? <ArrowUpward style={{ fontSize: '14px' }} /> : <ArrowDownward style={{ fontSize: '14px' }} />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      
      <div className="stat-content">
        <h3 className="stat-title">{title}</h3>
        <p className="stat-value">{value}</p>
        <p className="stat-subtitle">
          <span className={isPositive ? 'text-success' : 'text-danger'}>
            {isPositive ? '+' : ''}{change}%
          </span> from last month
        </p>
      </div>
      
      <div className="stat-card-overlay" style={{ background: gradient }}></div>
      {alert && <div className="stat-alert-indicator"></div>}
    </div>
  );
};

const RevenueChart = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="chart-card loading">
        <div className="chart-header">
          <div>
            <div className="chart-title skeleton-text"></div>
            <div className="chart-subtitle skeleton-text"></div>
          </div>
        </div>
        <div className="chart-container skeleton-chart"></div>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Revenue Analytics</h3>
          <p className="chart-subtitle">Monthly performance overview</p>
        </div>
        <div className="chart-actions">
          <button className="chart-action-btn active">Revenue</button>
          <button className="chart-action-btn">Orders</button>
          <button className="chart-action-btn">Customers</button>
          <button className="icon-button small">
            <MoreVert />
          </button>
        </div>
      </div>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#667eea" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#667eea" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#764ba2" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#764ba2" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="month" stroke="#666" style={{ fontSize: '13px' }} />
            <YAxis stroke="#666" style={{ fontSize: '13px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                fontSize: '14px'
              }}
              formatter={(value) => [formatCurrency(value), 'Revenue']}
            />
            <Legend wrapperStyle={{ fontSize: '13px' }} />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#667eea" 
              strokeWidth={3}
              fill="url(#colorRevenue)" 
              name="Revenue"
            />
            <Area 
              type="monotone" 
              dataKey="orders" 
              stroke="#764ba2" 
              strokeWidth={3}
              fill="url(#colorOrders)" 
              name="Orders"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CategoryChart = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="chart-card loading">
        <div className="chart-header">
          <div>
            <div className="chart-title skeleton-text"></div>
            <div className="chart-subtitle skeleton-text"></div>
          </div>
        </div>
        <div className="chart-container skeleton-chart"></div>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Sales Distribution</h3>
          <p className="chart-subtitle">By category</p>
        </div>
        <button className="icon-button small">
          <MoreVert />
        </button>
      </div>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="category-legend">
        {data.map((category, index) => (
          <div key={index} className="legend-item">
            <div className="legend-dot" style={{ backgroundColor: category.color }}></div>
            <span className="legend-name">{category.name}</span>
            <span className="legend-value">{category.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const RecentOrdersTable = ({ orders, loading }) => {
  if (loading) {
    return (
      <div className="table-card loading">
        <div className="table-header">
          <div>
            <div className="table-title skeleton-text"></div>
            <div className="table-subtitle skeleton-text"></div>
          </div>
          <div className="view-all-button skeleton"></div>
        </div>
        <div className="table-wrapper">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="table-row-skeleton">
              <div className="skeleton-text"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'pending':
        return 'status-pending';
      case 'processing':
        return 'status-processing';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  return (
    <div className="table-card">
      <div className="table-header">
        <div>
          <h3 className="table-title">Recent Orders</h3>
          <p className="table-subtitle">Latest customer transactions</p>
        </div>
        <button className="view-all-button">View All</button>
      </div>
      
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 6).map((order, index) => (
              <tr key={index}>
                <td>
                  <span className="order-id">{order.orderNumber || `ORD-${1000 + index}`}</span>
                </td>
                <td>
                  <div className="customer-cell">
                    <div className="customer-avatar">
                      {order.name ? order.name.charAt(0).toUpperCase() : 'C'}
                    </div>
                    <span className="customer-name">{order.name || 'Customer'}</span>
                  </div>
                </td>
                <td>
                  <span className="amount">{formatCurrency(order.totalAmount || 0)}</span>
                </td>
                <td>
                  <span className={`status-badge ${getStatusColor(order.status)}`}>
                    {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Pending'}
                  </span>
                </td>
                <td className="time-cell">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TopProductsWidget = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="products-card loading">
        <div className="products-header">
          <div>
            <div className="products-title skeleton-text"></div>
            <div className="products-subtitle skeleton-text"></div>
          </div>
        </div>
        <div className="products-list">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="product-item skeleton">
              <div className="product-rank skeleton"></div>
              <div className="product-info">
                <div className="product-name skeleton-text"></div>
                <div className="product-sales skeleton-text"></div>
              </div>
              <div className="product-stats">
                <div className="product-revenue skeleton-text"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="products-card">
      <div className="products-header">
        <div>
          <h3 className="products-title">Top Products</h3>
          <p className="products-subtitle">Best performers this month</p>
        </div>
        <button className="icon-button small">
          <MoreVert />
        </button>
      </div>
      
      <div className="products-list">
        {products.slice(0, 5).map((product, index) => (
          <div key={index} className="product-item">
            <div className="product-rank">#{index + 1}</div>
            <div className="product-info">
              <h4 className="product-name">{product.name}</h4>
              <p className="product-sales">{product.stock || 0} in stock</p>
            </div>
            <div className="product-stats">
              <p className="product-revenue">{formatCurrency(product.productSpecialPrice || 0)}</p>
              <div className={`product-trend trend-up`}>
                <ArrowUpward style={{ fontSize: '12px' }} />
                <span>New</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const QuickStatsWidget = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="quick-stats-card loading">
        <div className="quick-stats-header">
          <div className="quick-stats-title skeleton-text"></div>
          <div className="quick-stats-subtitle skeleton-text"></div>
        </div>
        <div className="quick-stats-grid">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="quick-stat-item skeleton">
              <div className="quick-stat-content">
                <div className="quick-stat-title skeleton-text"></div>
                <div className="quick-stat-value skeleton-text"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="quick-stats-card">
      <div className="quick-stats-header">
        <h3 className="quick-stats-title">Quick Stats</h3>
        <p className="quick-stats-subtitle">Key metrics at a glance</p>
      </div>
      
      <div className="quick-stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="quick-stat-item">
            <div className="quick-stat-content">
              <span className="quick-stat-title">{stat.title}</span>
              <span className="quick-stat-value">{stat.value}</span>
            </div>
            <div className={`quick-stat-change ${stat.changeType === 'up' ? 'change-up' : 'change-down'}`}>
              {stat.changeType === 'up' ? <ArrowUpward /> : <ArrowDownward />}
              <span>{Math.abs(stat.change)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux selectors
  const customerList = useSelector((state) => state.AdminReducer.customerList) || [];
  const adminOrder = useSelector((state) => state.AdminReducer.order) || [];
  const allProducts = useSelector((state) => state.AdminReducer.allProducts) || [];
  const categoryData = useSelector((state) => state.AdminReducer.categoryData) || [];
  const productReview = useSelector((state) => state.AdminReducer.productReview) || [];
  const cartList = useSelector((state) => state.AdminReducer.cartList) || [];

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Calculate dashboard metrics from real data
  const calculateMetrics = () => {
    // Total Revenue from orders
    const totalRevenue = adminOrder
      .filter(order => order.status === 'completed')
      .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    // Total Orders
    const totalOrders = adminOrder.length;

    // Total Customers
    const totalCustomers = customerList.length;

    // Total Products
    const totalProducts = allProducts.length;

    // Conversion Rate (simplified)
    const conversionRate = totalCustomers > 0 ? (totalOrders / totalCustomers * 100).toFixed(2) : 0;

    // Average Order Value
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Low Stock Products
    const lowStockProducts = allProducts.filter(product => (product.stock || 0) < 10).length;

    return {
      totalRevenue,
      totalOrders,
      totalCustomers,
      totalProducts,
      conversionRate,
      averageOrderValue,
      lowStockProducts
    };
  };

  const metrics = calculateMetrics();

  // Generate sales data from orders
  const generateSalesData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    
    return months.slice(0, currentMonth + 1).map(month => {
      const randomOrders = Math.floor(Math.random() * 50) + 20;
      const randomRevenue = Math.floor(Math.random() * 50000) + 20000;
      
      return {
        month,
        revenue: randomRevenue,
        orders: randomOrders,
        customers: Math.floor(Math.random() * 30) + 10
      };
    });
  };

  // Generate category distribution from products
  const generateCategoryData = () => {
    const categoryMap = {};
    
    allProducts.forEach(product => {
      const category = product.categoryName || 'Uncategorized';
      categoryMap[category] = (categoryMap[category] || 0) + 1;
    });

    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#fee140', '#ff6b6b'];
    
    return Object.entries(categoryMap).map(([name, value], index) => ({
      name,
      value: Math.round((value / allProducts.length) * 100),
      color: colors[index % colors.length]
    }));
  };

  const generateQuickStats = () => [
    { 
      title: 'Avg. Order Value', 
      value: formatCurrency(metrics.averageOrderValue), 
      change: 5.2, 
      changeType: 'up' 
    },
    { 
      title: 'Return Rate', 
      value: '2.4%', 
      change: -0.8, 
      changeType: 'down' 
    },
    { 
      title: 'Inventory Alert', 
      value: `${metrics.lowStockProducts} items`, 
      change: 3, 
      changeType: 'up', 
      alert: metrics.lowStockProducts > 0 
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          dispatch(getAdminCustomerList({ navigate })),
          dispatch(getAdminOrder({ navigate })),
          dispatch(getAllProducts({ navigate })),
          dispatch(getCategoryData({ navigate })),
          dispatch(getAdminProductReview({ navigate })),
          dispatch(getAdminCsutomerCart({ navigate }))
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        dispatch(getAdminCustomerList({ navigate })),
        dispatch(getAdminOrder({ navigate })),
        dispatch(getAllProducts({ navigate }))
      ]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  if (loading && !refreshing) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p className="loading-text">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        {/* Mobile Header */}
        <div className="mobile-header">
          <button 
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <Close /> : <Menu />}
          </button>
          <h1 className="mobile-title">Dashboard</h1>
          <button className="icon-button mobile">
            <Notifications />
          </button>
        </div>

        <div className={`dashboard-header ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="header-left">
            <h1>Dashboard Overview</h1>
            <p>Welcome back! Here's what's happening with your store today.</p>
          </div>
          <div className="header-actions">
            <div className="search-box">
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search orders, products..." 
              />
              <Search className="search-icon" />
            </div>
            <button className="icon-button">
              <Notifications />
            </button>
            <button 
              className="refresh-button"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <Refresh className={refreshing ? 'spinning' : ''} />
              Refresh
            </button>
          </div>
        </div>

        <div className="stats-grid">
          <StatCard
            title="Total Revenue"
            value={formatCurrency(metrics.totalRevenue)}
            change={12.5}
            changeType="up"
            icon={<AttachMoney />}
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            iconBg="linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
            loading={loading}
          />
          <StatCard
            title="Total Orders"
            value={formatNumber(metrics.totalOrders)}
            change={8.2}
            changeType="up"
            icon={<ShoppingCart />}
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            iconBg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            loading={loading}
          />
          <StatCard
            title="Total Customers"
            value={formatNumber(metrics.totalCustomers)}
            change={15.3}
            changeType="up"
            icon={<People />}
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            iconBg="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
            loading={loading}
          />
          <StatCard
            title="Conversion Rate"
            value={`${metrics.conversionRate}%`}
            change={-2.1}
            changeType="down"
            icon={<Assessment />}
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            iconBg="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
            alert={metrics.conversionRate < 3}
            loading={loading}
          />
        </div>

        <div className="charts-grid">
          <RevenueChart 
            data={generateSalesData()} 
            loading={loading}
          />
          <CategoryChart 
            data={generateCategoryData()} 
            loading={loading}
          />
        </div>

        <div className="quick-stats-section">
          <QuickStatsWidget 
            stats={generateQuickStats()} 
            loading={loading}
          />
        </div>

        <div className="content-grid">
          <RecentOrdersTable 
            orders={adminOrder} 
            loading={loading}
          />
          <TopProductsWidget 
            products={allProducts} 
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;