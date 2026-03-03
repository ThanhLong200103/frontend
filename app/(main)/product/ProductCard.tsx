'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Badge, Card } from 'react-bootstrap'

export default function ProductCard({ p }: any) {
  const [hover, setHover] = useState(false)
  // console.log(p.images)

  return (
    <Card 
      className="h-100"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        border: hover ? '2px solid #ee4d2d' : '1px solid #ddd',
        boxShadow: hover
          ? '0 8px 20px rgba(0,0,0,0.15)'
          : '0 2px 6px rgba(0,0,0,0.08)',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
      }}
    >
    <Link href={`/product/${p.id}`} className="text-decoration-none">
    {/* Ảnh + badge */}
      <div className="position-relative">
        <Card.Img
          src={p.images[0].url}
          style={{ height: 180, objectFit: 'cover' }}
        />

        {p.discount && (
          <Badge
            bg="danger"
            text="w"
            className="position-absolute top-0 end-0 m-1"
          >
            -{p.discount}%
          </Badge>
        )}
      </div>

      <Card.Body className="p-2">
        {/* Tên */}
        <div
          style={{
            fontSize: 14,
            lineHeight: '18px',
            height: 36,
            overflow: 'hidden',
            
          }}
        >
          <p style={{color:'black'}}>{p.name}</p>
        </div>

        {/* Giá */}
        <div className="text-danger fw-bold mt-1">
          {p.price.toLocaleString()}đ
        </div>

        {/* Đã bán */}
        <div className="text-muted" style={{ fontSize: 12 }}>
          Đã bán {p.sold}+
        </div>
      </Card.Body>
    </Link>
    </Card>
  )
}
