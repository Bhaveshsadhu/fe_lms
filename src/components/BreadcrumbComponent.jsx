import React from 'react'
import { Breadcrumb } from 'react-bootstrap';

const BreadcrumbComponent = () => {
    const breadcrumbs = [
        { label: 'Home', link: '/' },
        { label: 'Computers & Internet', link: '#' },
        { label: 'Programming', link: '#' },
        { label: 'Software Design, Testing & Engineering', link: '#' },
        { label: 'Software Development', active: true },
    ];
    return (
        <Breadcrumb>
            {breadcrumbs.map((bc, idx) =>
                bc.active ? (
                    <Breadcrumb.Item active key={idx}>
                        {bc.label}
                    </Breadcrumb.Item>
                ) : (
                    <Breadcrumb.Item href={bc.link} key={idx}>
                        {bc.label}
                    </Breadcrumb.Item>
                )
            )}
        </Breadcrumb>
    )
}

export default BreadcrumbComponent